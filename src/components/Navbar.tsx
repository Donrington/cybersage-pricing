'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive breakpoints (no SSR mismatch — initialised false, updated on mount)
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 600);
      setIsTablet(window.innerWidth < 1024);
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -20, opacity: 0, duration: 1, delay: 2.6, ease: 'power3.out',
    });
  }, []);

  const handleInquiry = () => {
    window.location.href = 'mailto:abakwecarrington@gmail.com?subject=Service%20Inquiry&body=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.';
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0.875rem 1.25rem' : '1.25rem 2rem',
        borderBottom: '1px solid #191919',
        background: 'rgba(6,6,6,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        gap: '0.75rem',
      }}
    >
      {/* Logo — always links to main portfolio */}
      <a
        href="https://cybersage.dev"
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        title="CyberSage portfolio"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pricing/sage_horiz1_white.png"
          alt="CyberSage"
          style={{ objectFit: 'contain', height: isMobile ? 20 : 28, width: 'auto', display: 'block' }}
        />
      </a>

      {/* Center status indicator */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.15em',
        color: '#2A2A2A',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        flexShrink: 0,
      }}>
        <span style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#3AB515',
          display: 'inline-block',
          flexShrink: 0,
          boxShadow: '0 0 6px #3AB515',
        }} />
        {/* Text hidden below 600px */}
        {!isMobile && <span>SYSTEM ONLINE</span>}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '0.75rem', flexShrink: 0 }}>
        {/* Portfolio link — desktop only */}
        {!isTablet && (
          <a
            href="https://cybersage.dev"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.25rem',
              border: '1px solid #191919',
              background: 'transparent',
              color: '#3A3A3A',
              textDecoration: 'none',
              transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E8E8E8';
              e.currentTarget.style.borderColor = '#2A2A2A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#3A3A3A';
              e.currentTarget.style.borderColor = '#191919';
            }}
          >
            ← PORTFOLIO
          </a>
        )}

        {/* Contact button — full text on tablet+, icon on mobile */}
        <button
          onClick={handleInquiry}
          data-hover="true"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isMobile ? '0.9rem' : '0.65rem',
            letterSpacing: isMobile ? 0 : '0.15em',
            textTransform: 'uppercase',
            padding: isMobile ? '0.45rem 0.65rem' : '0.6rem 1.4rem',
            border: '1px solid #242424',
            background: 'transparent',
            color: '#E8E8E8',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C8952A';
            e.currentTarget.style.borderColor = '#C8952A';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#242424';
            e.currentTarget.style.color = '#E8E8E8';
          }}
        >
          {isMobile ? '✉' : '[ GET IN TOUCH ]'}
        </button>
      </div>
    </nav>
  );
}
