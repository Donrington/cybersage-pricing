'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ThreeBackground } from './ThreeBackground';
import { allTiers } from '@/lib/pricing-data';

interface HeroSectionProps {
  currency: 'ngn' | 'usd';
  onToggle: (c: 'ngn' | 'usd') => void;
}

export function HeroSection({ currency, onToggle }: HeroSectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll<HTMLSpanElement>('.hero-char');
    const tl = gsap.timeline({ delay: 2.5 });

    tl.to(chars ?? [], {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'power4.out',
      stagger: 0.04,
    })
      .from(subRef.current, { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
      .from(metaRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(scrollHintRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');
  }, []);

  const heroWords = ['PRICING', 'INTELLIGENCE'];

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: '5.5rem',
        paddingBottom: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        overflow: 'hidden',
        borderBottom: '1px solid #191919',
        boxSizing: 'border-box',
      }}
    >
      {/* LAYER 1 — hero background photo */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/hero_p.png"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>

      {/* LAYER 2 — dark scrim so text stays readable over the photo */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'rgba(6,6,6,0.68)',
        }}
      />

      {/* LAYER 3 — Three.js animated dot-grid (canvas is transparent, floats over photo) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <ThreeBackground />
      </div>

      {/* LAYER 4 — gradient vignettes for depth */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background: 'radial-gradient(ellipse 90% 70% at 50% 110%, transparent 0%, rgba(6,6,6,0.7) 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          zIndex: 3,
          background: 'linear-gradient(to bottom, transparent, #060606)',
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 5 — all text content */}

      {/* Top-right metadata block — hidden on mobile via CSS */}
      <div
        ref={metaRef}
        className="hero-meta"
        style={{
          position: 'absolute',
          top: '6rem',
          right: '2rem',
          zIndex: 10,
          textAlign: 'right',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: '#6A6A6A',
          lineHeight: 1.8,
          textTransform: 'uppercase',
        }}
      >
        <div>CyberSage Web Solutions</div>
        <div>REV 4.2 // ACTIVE</div>
        <div style={{ color: '#3A3A3A' }}>─────────────────</div>
        <div>Service Catalog 2026</div>
        <div style={{ color: '#C8952A' }}>{allTiers.length} MODULES LOADED</div>
      </div>

      {/* Top-left system status — hidden on mobile via CSS */}
      <div
        className="hero-meta"
        style={{
          position: 'absolute',
          top: '6rem',
          left: '2rem',
          zIndex: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: '#6A6A6A',
          lineHeight: 1.8,
          textTransform: 'uppercase',
        }}
      >
        <div>[ SYSTEM ONLINE ]</div>
        <div style={{ color: '#3A3A3A' }}>COORD: 6.5244°N, 3.3792°E</div>
        <div>SECTOR: DIGITAL INFRASTRUCTURE</div>
      </div>

      {/* Main title */}
      <div
        ref={titleRef}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1400,
        }}
      >
        {heroWords.map((word, wi) => (
          <div
            key={wi}
            className="hero-word"
            style={{
              display: 'block',
              fontFamily: "'Syne', 'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 8.5vw, 8.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: wi === 0 ? '#E8E8E8' : 'transparent',
              WebkitTextStroke: wi === 1 ? '1.5px rgba(232,232,232,0.45)' : undefined,
              overflow: 'hidden',
              paddingBottom: '0.05em',
            }}
          >
            {word.split('').map((char, ci) => (
              <span key={ci} className="hero-char" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
          </div>
        ))}

        {/* Subtitle row */}
        <div
          ref={subRef}
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                color: '#8A8A8A',
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              Transform your digital presence with precision-engineered web solutions.
              Transparent pricing. Surgical execution. Results that compound.
            </p>

            {/* Portfolio link */}
            <a
              href="https://cybersage.dev"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                alignSelf: 'flex-start',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#C8952A',
                padding: '0.65rem 1.25rem',
                border: '1px solid rgba(200,149,42,0.25)',
                background: 'rgba(200,149,42,0.06)',
                transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C8952A';
                e.currentTarget.style.borderColor = '#C8952A';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(200,149,42,0.06)';
                e.currentTarget.style.borderColor = 'rgba(200,149,42,0.25)';
                e.currentTarget.style.color = '#C8952A';
              }}
            >
              VIEW PORTFOLIO
              <span style={{ fontSize: '0.8em' }}>↗</span>
            </a>
          </div>

          {/* Currency toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <button
              className={`currency-btn ${currency === 'ngn' ? 'active' : ''}`}
              onClick={() => onToggle('ngn')}
              style={{ borderRight: 'none' }}
            >
              ₦ NGN
            </button>
            <button
              className={`currency-btn ${currency === 'usd' ? 'active' : ''}`}
              onClick={() => onToggle('usd')}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint — hidden on mobile via CSS */}
      <div
        ref={scrollHintRef}
        className="hero-scroll-hint"
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          zIndex: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#5A5A5A',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span>/// SCROLL TO EXPLORE ///</span>
      </div>
    </section>
  );
}
