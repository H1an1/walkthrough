import React from 'react';

export default function ProgressBar({ progress = 0 }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--purple), var(--pink), var(--yellow))',
        width: `${progress * 100}%`,
        zIndex: 10000,
        transition: 'width 0.1s ease-out',
      }}
    />
  );
}
