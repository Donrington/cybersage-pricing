'use client';

import { useEffect, useRef, useState } from 'react';

interface ContactModalProps {
  open: boolean;
  packageTitle: string;
  packagePrice: string;
  onClose: () => void;
}

export function ContactModal({ open, packageTitle, packagePrice, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (open) {
      el.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      el.classList.remove('open');
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const mailto = () => {
    const subject = encodeURIComponent(`Service Inquiry — ${packageTitle}`);
    const body = encodeURIComponent(
      `Hi CyberSage,\n\nI am interested in the ${packageTitle} package (${packagePrice}).\n\nPlease reach out to discuss the details.\n\nThank you.`,
    );
    window.location.href = `mailto:abakwecarrington@gmail.com?subject=${subject}&body=${body}`;
  };

  const whatsapp = () => {
    const msg = encodeURIComponent(`Hi! I'm interested in the ${packageTitle} package (${packagePrice}). Can we discuss?`);
    window.open(`https://wa.me/2347025495506?text=${msg}`, '_blank');
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="modal-content"
        style={{
          background: '#0B0B0B',
          border: '1px solid #242424',
          padding: isMobile ? '1.75rem 1.25rem' : '3rem',
          width: '90vw',
          maxWidth: 560,
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: '1px solid #242424',
            color: '#4A4A4A',
            width: 36,
            height: 36,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C8952A'; e.currentTarget.style.color = '#C8952A'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#4A4A4A'; }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#C8952A',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          [ INITIATE CONTACT ]
        </div>

        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          letterSpacing: '-0.03em',
          color: '#E8E8E8',
          lineHeight: 1,
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}>
          {packageTitle}
        </h2>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1.4rem',
          fontWeight: 700,
          color: '#C8952A',
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
        }}>
          {packagePrice}
        </div>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.875rem',
          color: '#4A4A4A',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          borderLeft: '2px solid #191919',
          paddingLeft: '1rem',
        }}>
          Ready to get started? Choose your preferred channel below and our team will respond within 24 hours with a detailed proposal.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={mailto}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: '#C8952A',
              border: 'none',
              color: '#000',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: isMobile ? 'flex-start' : 'space-between',
              gap: isMobile ? '0.35rem' : 0,
              textAlign: 'left',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            <span>EMAIL INQUIRY</span>
            <span style={{ fontSize: isMobile ? '0.6rem' : '0.7rem', opacity: isMobile ? 0.75 : 1 }}>
              abakwecarrington@gmail.com
            </span>
          </button>

          <button
            onClick={whatsapp}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: 'transparent',
              border: '1px solid #242424',
              color: '#E8E8E8',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C8952A'; e.currentTarget.style.color = '#C8952A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#E8E8E8'; }}
          >
            <span>WHATSAPP DIRECT</span>
            <span>OPEN CHAT ›</span>
          </button>
        </div>

        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #191919',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.12em',
          color: '#2A2A2A',
          textTransform: 'uppercase',
        }}>
          Response guaranteed within 24 hrs — Mon–Sat 09:00–18:00 WAT // +234 702 549 5506
        </div>
      </div>
    </div>
  );
}
