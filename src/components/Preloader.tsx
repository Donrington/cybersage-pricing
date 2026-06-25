'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onDone: () => void;
}

export function Preloader({ onDone }: PreloaderProps) {
  const strips = useRef<HTMLDivElement[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const total = 100;
    const duration = 2000;
    const step = duration / total;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      setCount(current);
      if (current >= total) clearInterval(interval);
    }, step);

    const tl = gsap.timeline({
      delay: 2.2,
      onComplete: () => {
        gsap.to(wrapRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: onDone,
        });
      },
    });

    // Fade out logo first
    tl.to(logoRef.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: 'power2.in' }, 0);
    tl.to(counterRef.current, { opacity: 0, duration: 0.2 }, 0.1);

    // Strips slide up staggered
    strips.current.forEach((el, i) => {
      tl.to(el, { yPercent: -105, duration: 0.7, ease: 'power4.inOut' }, 0.15 + i * 0.06);
    });

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      ref={wrapRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex' }}
    >
      {/* 5 vertical strips */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => { if (el) strips.current[i] = el; }}
          style={{ flex: 1, background: '#000', transformOrigin: 'top' }}
        />
      ))}

      {/* Pulsating logo in the center */}
      <div
        ref={logoRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9002,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Outer ring pulse */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Animated ring */}
          <div style={{
            position: 'absolute',
            width: 120,
            height: 120,
            border: '1px solid rgba(200,149,42,0.15)',
            animation: 'preloaderRing 2s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: 100,
            height: 100,
            border: '1px solid rgba(200,149,42,0.1)',
            animation: 'preloaderRing 2s ease-in-out infinite 0.3s',
          }} />
          {/* Logo */}
          <div style={{ animation: 'preloaderLogo 1.8s ease-in-out infinite' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pricing/logo_white.png"
              alt="CyberSage"
              width={64}
              height={64}
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

        {/* Loading label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          color: '#2A2A2A',
          textTransform: 'uppercase',
          animation: 'preloaderLogo 1.8s ease-in-out infinite 0.4s',
        }}>
          LOADING SYSTEM
        </div>
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 700,
          color: '#fff',
          zIndex: 9001,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
      >
        {String(count).padStart(3, '0')}
        <span style={{ fontSize: '0.4em', color: 'rgba(255,255,255,0.25)', verticalAlign: 'super', marginLeft: '0.1em' }}>%</span>
      </div>
    </div>
  );
}
