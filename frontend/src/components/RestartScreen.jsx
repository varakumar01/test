import React from 'react';
import { Plus } from 'lucide-react';

const WatchDogsLogo = () => (
  <img
    src="https://customer-assets.emergentagent.com/job_linux-portfolio-demo/artifacts/vlqctr2o_watch-dogs-logo-png-transparent.png"
    alt="Watch Dogs Logo"
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '800px',
      opacity: 0.08,
      zIndex: 5,
      pointerEvents: 'none',
      filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(5)'
    }}
  />
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
