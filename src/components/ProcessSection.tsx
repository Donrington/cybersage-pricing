'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    num: '01',
    title: 'Discovery & Scope',
    desc: 'We begin with a structured brief: your goals, audience, competitive landscape, and success metrics. No guesswork — only data-informed strategy. Within 24 hours, you receive a precise project scope and delivery timeline.',
  },
  {
    num: '02',
    title: 'Design Architecture',
    desc: 'Our design process is rooted in conversion science. Each pixel earns its place. We prototype in high fidelity, presenting 2–3 directional concepts before finalizing the visual system and component library.',
  },
  {
    num: '03',
    title: 'Engineering Execution',
    desc: 'Clean, semantic code. Performance-first builds targeting Lighthouse 95+. We deploy on proven infrastructure — Vercel, Netlify, or custom VPS — with CI/CD pipelines and automated backups configured from day one.',
  },
  {
    num: '04',
    title: 'QA & Optimization',
    desc: 'Every deliverable passes a 40-point quality checklist: cross-browser compatibility, mobile responsiveness, Core Web Vitals, accessibility (WCAG 2.1 AA), and security header configuration.',
  },
  {
    num: '05',
    title: 'Launch & Handover',
    desc: 'Go-live is a coordinated event, not an accident. We monitor post-launch analytics for 48 hours, deliver comprehensive documentation, and provide ongoing support per your selected tier.',
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    els.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => el.classList.add('visible'),
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        borderTop: '1px solid #191919',
        background: '#060606',
      }}
    >
      {/* Header */}
      <div
        className="reveal"
        style={{
          padding: '3rem 2rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'baseline',
          gap: '2rem',
          borderBottom: '1px solid #191919',
          flexWrap: 'wrap',
        }}
      >
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          letterSpacing: '-0.04em',
          color: '#E8E8E8',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          Engineering Process
        </h2>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: '#2A2A2A',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          SOP // REV 5.1
        </span>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((step, i) => (
          <div
            key={i}
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: 0,
              borderBottom: '1px solid #191919',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            {/* Number column */}
            <div style={{
              padding: '2rem',
              borderRight: '1px solid #191919',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: '#C8952A',
                textTransform: 'uppercase',
              }}>
                {step.num}
              </span>
            </div>

            {/* Content column */}
            <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                letterSpacing: '-0.02em',
                color: '#E8E8E8',
                textTransform: 'uppercase',
                lineHeight: 1.1,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.875rem',
                color: '#4A4A4A',
                lineHeight: 1.75,
              }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Guarantee strip */}
      <div
        className="reveal"
        style={{
          padding: '2rem',
          background: '#0B0B0B',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          borderTop: '1px solid #191919',
        }}
      >
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#C8952A',
          textTransform: 'uppercase',
        }}>
          [ GUARANTEE ]
        </div>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.8rem',
          color: '#4A4A4A',
          lineHeight: 1.6,
          maxWidth: 680,
        }}>
          Every project ships on time or you receive a 10% discount on the final invoice. We stand behind our delivery commitments with our reputation — not fine print.
        </p>
      </div>
    </section>
  );
}
