import React from 'react';
import { Plus } from 'lucide-react';

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
        animation: 'fadeIn 1s ease-in',
        background: 'transparent'
      }}
    >
      {/* Watch Dogs Logo at the top */}
      <img
        src="https://customer-assets.emergentagent.com/job_linux-portfolio-demo/artifacts/pts0vmtv_watch-dogs-logo-png-transparent-removebg-preview.png"
        alt="Watch Dogs Logo"
        style={{
          width: '350px',
          height: '350px',
          marginBottom: '40px',
          opacity: 0.9,
          filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(6) drop-shadow(0 0 15px rgba(0, 255, 0, 0.6))',
          pointerEvents: 'none'
        }}
      />
      
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
