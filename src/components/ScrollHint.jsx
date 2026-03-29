import React from 'react';

export default function ScrollHint({ visible = true }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 8000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          fontWeight: 500,
          color: 'rgba(196, 181, 253, 0.6)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Scroll to explore
      </div>

      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: 'bounce 2s ease-in-out infinite',
        }}
      >
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(8px); opacity: 1; }
          }
        `}</style>
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="20"
          stroke="rgba(196, 181, 253, 0.6)"
          strokeWidth="1.5"
        />
        <polyline
          points="18,14 12,20 6,14"
          stroke="rgba(196, 181, 253, 0.6)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
