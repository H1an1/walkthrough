import React from 'react';

export default function NavPill({ chapters = [], activeIdx = -1, onNavigate = () => {} }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '12px 24px',
        background: 'rgba(10, 10, 10, 0.75)',
        backdropFilter: 'blur(24px)',
        borderRadius: '100px',
        border: '1px solid rgba(196, 181, 253, 0.1)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--display)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          color: 'var(--purple)',
          textTransform: 'uppercase',
        }}
      >
        Walkthrough
      </div>

      <div
        style={{
          width: '1px',
          height: '16px',
          background: 'rgba(196, 181, 253, 0.2)',
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '16px',
        }}
      >
        {chapters.map((chapter, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(chapter.navTo)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--sans)',
              fontSize: '11px',
              fontWeight: idx === activeIdx ? 600 : 400,
              color: idx === activeIdx ? 'var(--purple)' : 'rgba(196, 181, 253, 0.5)',
              cursor: 'pointer',
              padding: '4px 8px',
              transition: 'color 0.2s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              if (idx !== activeIdx) {
                e.target.style.color = 'var(--purple)';
              }
            }}
            onMouseLeave={(e) => {
              if (idx !== activeIdx) {
                e.target.style.color = 'rgba(196, 181, 253, 0.5)';
              }
            }}
          >
            {chapter.navLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
