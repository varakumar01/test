import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../mock';
import CommandOutput from './CommandOutput';

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [userIp, setUserIp] = useState('fetching...');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    // Fetch user's public IP immediately on load
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setUserIp(data.ip);
        portfolioData.user.ip = data.ip;
      })
      .catch(() => {
        setUserIp('127.0.0.1');
        portfolioData.user.ip = '127.0.0.1';
      });
    
    // Initial prompt without welcome message
    setHistory([
      { type: 'system', content: `${portfolioData.user.name} - ${portfolioData.user.role}` },
      { type: 'system', content: '' },
      { type: 'system', content: "Type 'help' for available commands or 'ls' to see portfolio sections." },
      { type: 'system', content: '' }
    ]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (!trimmedCmd) {
      return;
    }

    // Process command
    let output;
    
    // Handle sudo command
    if (command === 'sudo') {
      const sudoCmd = args.join(' ');
      output = { type: 'error', content: `Authorization revoked${sudoCmd ? ': ' + sudoCmd : ''}` };
    }
    // Handle ls with flags
    else if (command === 'ls') {
      const hasAll = args.includes('-a') || args.includes('-al') || args.includes('-la');
      const hasLong = args.includes('-l') || args.includes('-al') || args.includes('-la');
      output = { type: 'ls', showAll: hasAll, showLong: hasLong };
    }
    // Handle gitlab commands
    else if (command === 'gitlab') {
      const flag = args[0];
      if (flag === '--featured' || flag === '--skills' || flag === '--recent') {
        output = { type: 'projects' };
      } else if (flag === '--help') {
        output = { type: 'gitlab-help' };
      } else {
        output = { type: 'gitlab' };
      }
    }
    // Handle cat command
    else if (command === 'cat') {
      const section = args.join(' ').toLowerCase();
      if (section === 'projects' || section === '.projects') {
        output = { type: 'projects' };
      } else if (section === 'gitlab' || section === '.gitlab') {
        output = { type: 'gitlab' };
      } else if (section === 'skills' || section === '.skills') {
        output = { type: 'skills' };
      } else if (section === 'experience' || section === '.experience') {
        output = { type: 'experience' };
      } else if (section === 'certifications' || section === '.certifications') {
        output = { type: 'certifications' };
      } else if (section === 'contact' || section === '.contact') {
        output = { type: 'contact' };
      } else if (section === 'about' || section === '.about') {
        output = { type: 'about' };
      } else if (section === 'issues' || section === '.issues' || section === 'known-issues') {
        output = { type: 'issues' };
      } else if (section === 'resume' || section === '.resume') {
        window.open(portfolioData.resumeLink, '_blank');
        output = { type: 'system', content: 'Opening resume in new tab...' };
      } else if (section) {
        output = { type: 'error', content: `cat: ${section}: No such file or directory` };
      } else {
        output = { type: 'error', content: 'cat: missing file operand\nTry \'cat --help\' for more information.' };
      }
    }
    else {
      switch (command) {
        case 'help':
        case '--help':
          output = { type: 'help' };
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'whoami':
          output = { type: 'whoami' };
          break;
        case 'about':
          output = { type: 'about' };
          break;
        case 'projects':
          output = { type: 'projects' };
          break;
        case 'skills':
          output = { type: 'skills' };
          break;
        case 'certifications':
          output = { type: 'certifications' };
          break;
        case 'contact':
          output = { type: 'contact' };
          break;
        case 'experience':
          output = { type: 'experience' };
          break;
        case 'issues':
        case 'known-issues':
          output = { type: 'issues' };
          break;
        case 'status':
          output = { type: 'status' };
          break;
        case 'impact':
          output = { type: 'impact' };
          break;
        case 'resume':
          window.open(portfolioData.resumeLink, '_blank');
          output = { type: 'system', content: 'Opening resume in new tab...' };
          break;
        case 'neofetch':
          output = { type: 'neofetch' };
          break;
        default:
          output = { type: 'error', content: `${command}: command not found` };
      }
    }

    setHistory(prev => [...prev, output]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === newIndex) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setCurrentCommand('');
    }
  };

  return (
    <div 
      className="terminal-container"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">varakumar@{portfolioData.user.ip}:~</div>
      </div>
      
      <div className="terminal-body" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index}>
            {item.type === 'command' && (
              <div className="terminal-line">
                <span className="terminal-prompt">
                  <span className="terminal-user">varakumar@{portfolioData.user.ip}</span>
                  <span className="terminal-separator">:</span>
                  <span className="terminal-path">~</span>
                  <span className="terminal-dollar">$</span>
                </span>
                <span className="terminal-command">{item.content}</span>
              </div>
            )}
            {item.type === 'system' && (
              <div className="terminal-output">{item.content}</div>
            )}
            {item.type === 'error' && (
              <div className="terminal-error">{item.content}</div>
            )}
            {!['command', 'system', 'error'].includes(item.type) && (
              <CommandOutput 
                type={item.type} 
                data={portfolioData} 
                showAll={item.showAll}
                showLong={item.showLong}
              />
            )}
          </div>
        ))}
        
        <div className="terminal-line">
          <span className="terminal-prompt">
            <span className="terminal-user">varakumar@{portfolioData.user.ip}</span>
            <span className="terminal-separator">:</span>
            <span className="terminal-path">~</span>
            <span className="terminal-dollar">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
