import React from 'react';
import { Plus } from 'lucide-react';

const WatchDogsLogo = () => (
  <svg
    viewBox="0 0 200 200"
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '800px',
      opacity: 0.08,
      zIndex: 5,
      pointerEvents: 'none'
    }}
  >
    {/* Stylized Watch Dogs inspired logo */}
    <g>
      {/* Outer circle */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#00ff00" strokeWidth="1" />
      
      {/* Inner geometric pattern */}
      <path
        d="M 100 20 L 120 50 L 150 40 L 130 70 L 160 80 L 130 100 L 160 120 L 130 130 L 150 160 L 120 150 L 100 180 L 80 150 L 50 160 L 70 130 L 40 120 L 70 100 L 40 80 L 70 70 L 50 40 L 80 50 Z"
        fill="none"
        stroke="#00ff00"
        strokeWidth="1.5"
      />
      
      {/* Central diamond */}
      <path
        d="M 100 60 L 130 100 L 100 140 L 70 100 Z"
        fill="none"
        stroke="#00ff00"
        strokeWidth="2"
      />
      
      {/* Cross pattern */}
      <line x1="100" y1="30" x2="100" y2="170" stroke="#00ff00" strokeWidth="1" opacity="0.6" />
      <line x1="30" y1="100" x2="170" y2="100" stroke="#00ff00" strokeWidth="1" opacity="0.6" />
      
      {/* Corner accents */}
      <line x1="50" y1="50" x2="70" y2="70" stroke="#00ff00" strokeWidth="1.5" />
      <line x1="150" y1="50" x2="130" y2="70" stroke="#00ff00" strokeWidth="1.5" />
      <line x1="50" y1="150" x2="70" y2="130" stroke="#00ff00" strokeWidth="1.5" />
      <line x1="150" y1="150" x2="130" y2="130" stroke="#00ff00" strokeWidth="1.5" />
      
      {/* Central dot */}
      <circle cx="100" cy="100" r="5" fill="#00ff00" opacity="0.8" />
    </g>
  </svg>
);

const RestartScreen = ({ onRestart }) => {
  return (
    <div 
      className="restart-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        animation: 'fadeIn 1s ease-in'
      }}
    >
      {/* Watch Dogs Logo - Only on restart screen */}
      <WatchDogsLogo />
      
      <div 
        onClick={onRestart}
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          position: 'relative',
          zIndex: 110
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '0.9';
        }}
      >
        <Plus 
          size={120} 
          color="#00ff00" 
          strokeWidth={1.5}
          style={{
            marginBottom: '20px',
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 0, 0.5))'
          }}
        />
        <div 
          style={{
            fontSize: '24px',
            color: '#00ff00',
            fontFamily: "'Source Code Pro', 'Courier New', monospace",
            letterSpacing: '2px',
            textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          Start a new session
        </div>
      </div>
    </div>
  );
};

export default RestartScreen;
