import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../mock';
import CommandOutput from './CommandOutput';
import Particles from './Particles';
import RestartScreen from './RestartScreen';

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [userIp, setUserIp] = useState('fetching...');
  const [tabMatches, setTabMatches] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOriginalInput, setTabOriginalInput] = useState('');
  const [terminalStatus, setTerminalStatus] = useState('active'); // active, exiting, shutdown
  const [showParticles, setShowParticles] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const restartTerminal = () => {
    // Reset all state
    setHistory([
      { type: 'system', content: `${portfolioData.user.name} - ${portfolioData.user.role}` },
      { type: 'system', content: '' },
      { type: 'system', content: "Type 'help' for available commands or 'ls' to see portfolio sections." },
      { type: 'system', content: '' }
    ]);
    setCommandHistory([]);
    setHistoryIndex(-1);
    setCurrentCommand('');
    setTabMatches([]);
    setTabIndex(0);
    setTabOriginalInput('');
    setTerminalStatus('active');
    setShowParticles(false);
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

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
        case 'exit':
        case 'quit':
          setTerminalStatus('exiting');
          setHistory(prev => [...prev, 
            { type: 'command', content: cmd },
            { type: 'system', content: `Connection to ${userIp} closed.` },
            { type: 'system', content: 'Session ended.' }
          ]);
          
          setTimeout(() => {
            setHistory(prev => [...prev, 
              { type: 'zap', content: '[+] Terminating session...' }
            ]);
            
            // Start transition after zap effect completes
            setTimeout(() => {
              setShowParticles(true);
              setTerminalStatus('shutdown');
            }, 500);
          }, 600);
          return;
        default:
          output = { type: 'error', content: `${command}: command not found` };
      }
    }

    setHistory(prev => [...prev, output]);
  };

  const handleKeyDown = (e) => {
    // Prevent any input if terminal is not active
    if (terminalStatus !== 'active') {
      e.preventDefault();
      return;
    }
    
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(currentCommand);
      setCurrentCommand('');
      setTabMatches([]);
      setTabIndex(0);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      if (!currentCommand.trim()) {
        return; // Ignore tab if no input
      }
      
      // Use the original input for matching, not the current filled value
      const input = tabMatches.length > 0 ? tabOriginalInput : currentCommand.trim();
      const inputLower = input.toLowerCase();
      const parts = input.split(' ');
      
      // List of available commands and sections
      const commands = [
        'help', 'ls', 'clear', 'whoami', 'about', 'status', 'impact', 
        'neofetch', 'projects', 'experience', 'skills', 'certifications', 
        'contact', 'gitlab', 'issues', 'resume', 'cat', 'sudo', 'exit'
      ];
      
      const sections = [
        'about', 'experience', 'projects', 'skills', 'certifications', 
        'gitlab', 'known-issues', 'issues', 'resume', 'contact'
      ];
      
      let matches = [];
      
      // Handle "cat <section>" completion
      if (parts[0].toLowerCase() === 'cat' && parts.length > 1) {
        const sectionInput = parts.slice(1).join(' ').toLowerCase();
        matches = sections.filter(s => s.startsWith(sectionInput)).map(s => `cat ${s}`);
      }
      // Handle regular command completion
      else {
        // Try to match commands first
        const cmdMatches = commands.filter(cmd => cmd.startsWith(inputLower));
        // Also try to match section names directly
        const sectionMatches = sections.filter(s => s.startsWith(inputLower));
        matches = [...new Set([...cmdMatches, ...sectionMatches])];
      }
      
      if (matches.length === 0) {
        // No matches, clear tab state
        setTabMatches([]);
        setTabIndex(0);
        setTabOriginalInput('');
      } else if (matches.length === 1) {
        // Single match, autocomplete
        setCurrentCommand(matches[0]);
        setTabMatches([]);
        setTabIndex(0);
        setTabOriginalInput('');
      } else {
        // Multiple matches
        if (tabMatches.length === 0) {
          // First tab press - show all matches and fill first
          setHistory(prev => [...prev, 
            { type: 'command', content: input },
            { type: 'system', content: matches.join('  ') }
          ]);
          setTabMatches(matches);
          setTabIndex(0);
          setTabOriginalInput(input);
          setCurrentCommand(matches[0]);
        } else {
          // Already cycling - move to next match
          const nextIndex = (tabIndex + 1) % matches.length;
          setTabIndex(nextIndex);
          setCurrentCommand(matches[nextIndex]);
        }
      }
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
      setTabMatches([]);
      setTabIndex(0);
      setTabOriginalInput('');
    } else {
      // Reset tab completion on any other key
      setTabMatches([]);
      setTabIndex(0);
      setTabOriginalInput('');
    }
  };

  return (
    <>
      {showParticles && <Particles />}
      {terminalStatus === 'shutdown' && <RestartScreen onRestart={restartTerminal} />}
      
      <div 
        className={`terminal-container ${terminalStatus === 'shutdown' ? 'terminal-fade-out' : ''}`}
        onClick={() => terminalStatus === 'active' && inputRef.current?.focus()}
        style={{
          opacity: terminalStatus === 'shutdown' ? 0 : 1,
          visibility: terminalStatus === 'shutdown' ? 'hidden' : 'visible',
          transition: 'opacity 0.8s ease-out',
          position: 'relative',
          zIndex: terminalStatus === 'shutdown' ? 1 : 10
        }}
      >
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">varakumar@{userIp}:~</div>
      </div>
      
      <div className="terminal-body" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index}>
            {item.type === 'command' && (
              <div className="terminal-line">
                <span className="terminal-prompt">
                  <span className="terminal-user">varakumar@{userIp}</span>
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
            {item.type === 'zap' && (
              <div className="terminal-output terminal-zap">{item.content}</div>
            )}
            {!['command', 'system', 'error', 'zap'].includes(item.type) && (
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
            <span className="terminal-user">varakumar@{userIp}</span>
            <span className="terminal-separator">:</span>
            <span className="terminal-path">~</span>
            <span className="terminal-dollar">$</span>
          </span>
          {terminalStatus === 'active' && (
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
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Terminal;
