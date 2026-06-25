'use client';

import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      data-hover="true"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 44,
        height: 44,
        background: '#C8952A',
        border: 'none',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 800,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transition: 'opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#E8E8E8'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = '#C8952A'; }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
      </svg>
    </button>
  );
}
