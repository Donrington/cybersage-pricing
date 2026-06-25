'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories, type ServiceTier } from '@/lib/pricing-data';
import { ContactModal } from './ContactModal';

interface PricingSectionProps {
  currency: 'ngn' | 'usd';
}

function PricingCard({
  tier,
  currency,
  onContact,
  index,
}: {
  tier: ServiceTier;
  currency: 'ngn' | 'usd';
  onContact: (t: ServiceTier) => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const isFeatured = !!tier.tag;
  const price = currency === 'ngn' ? `₦${tier.ngn}` : `$${tier.usd}`;
  const extraCount = tier.features.length - 6;
  const hasMore = extraCount > 0;

  return (
    <div
      ref={cardRef}
      className={`pricing-card reveal ${isFeatured ? 'is-featured' : ''}`}
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transitionDelay: `${index * 0.08}s`,
        position: 'relative',
      }}
    >
      {/* Tag */}
      {tier.tag && (
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '0.25rem 0.6rem',
          background: tier.tag === 'POPULAR' ? '#CC2020' : '#C8952A',
          color: '#fff',
          fontWeight: 700,
        }}>
          {tier.tag === 'POPULAR' ? '★ POPULAR' : '◆ ENTERPRISE'}
        </div>
      )}

      {/* Unit ID */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.55rem',
        letterSpacing: '0.2em',
        color: '#2A2A2A',
        textTransform: 'uppercase',
        marginBottom: '1.25rem',
      }}>
        {tier.unit}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
        letterSpacing: '-0.03em',
        color: '#E8E8E8',
        textTransform: 'uppercase',
        lineHeight: 1,
        marginBottom: '1.5rem',
      }}>
        {tier.title}
      </h3>

      {/* Price */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        color: isFeatured ? '#C8952A' : '#E8E8E8',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.25rem',
      }}>
        {price}
        {tier.priceSuffix && (
          <span style={{ fontSize: '0.4em', color: '#3A3A3A', fontWeight: 400, letterSpacing: '0.05em' }}>
            {tier.priceSuffix}
          </span>
        )}
      </div>

      {/* Delivery */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        color: '#3A3A3A',
        textTransform: 'uppercase',
        marginBottom: '1.75rem',
        paddingBottom: '1.75rem',
        borderBottom: '1px solid #191919',
        display: 'flex',
        gap: '1.5rem',
      }}>
        <span>DEL: {tier.delivery}</span>
        <span>SUPPORT: {tier.support}</span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.8rem',
        color: '#4A4A4A',
        lineHeight: 1.7,
        marginBottom: '1.75rem',
        flexGrow: 1,
      }}>
        {tier.description}
      </p>

      {/* Features */}
      <div style={{ marginBottom: '2rem' }}>
        {/* First 6 — always visible */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {tier.features.slice(0, 6).map((f, fi) => (
            <div
              key={fi}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.78rem',
                color: '#4A4A4A',
                lineHeight: 1.5,
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isFeatured ? '#C8952A' : '#2A2A2A',
                flexShrink: 0,
                marginTop: '0.05em',
                fontSize: '0.7rem',
              }}>
                ›
              </span>
              {f}
            </div>
          ))}
        </div>

        {/* Extra features — collapsible */}
        {hasMore && (
          <>
            <div
              style={{
                overflow: 'hidden',
                maxHeight: expanded ? '999px' : 0,
                transition: 'max-height 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.6rem' }}>
                {tier.features.slice(6).map((f, fi) => (
                  <div
                    key={fi + 6}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.78rem',
                      color: '#4A4A4A',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isFeatured ? '#C8952A' : '#2A2A2A',
                      flexShrink: 0,
                      marginTop: '0.05em',
                      fontSize: '0.7rem',
                    }}>
                      ›
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded((v) => !v)}
              data-hover="true"
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                marginTop: '0.75rem',
                background: 'transparent',
                border: '1px solid #1C1C1C',
                color: expanded ? '#C8952A' : '#2A2A2A',
                borderColor: expanded ? '#C8952A33' : '#1C1C1C',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.58rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C8952A';
                e.currentTarget.style.color = '#C8952A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = expanded ? '#C8952A33' : '#1C1C1C';
                e.currentTarget.style.color = expanded ? '#C8952A' : '#2A2A2A';
              }}
            >
              <span>
                {expanded ? '− COLLAPSE' : `+ ${extraCount} MORE INCLUDED`}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                ↓
              </span>
            </button>
          </>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() => onContact(tier)}
        data-hover="true"
        style={{
          width: '100%',
          padding: '0.9rem 1.5rem',
          background: isFeatured ? '#C8952A' : 'transparent',
          border: `1px solid ${isFeatured ? '#C8952A' : '#242424'}`,
          color: isFeatured ? '#000' : '#E8E8E8',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onMouseEnter={(e) => {
          if (!isFeatured) {
            e.currentTarget.style.background = '#C8952A';
            e.currentTarget.style.borderColor = '#C8952A';
            e.currentTarget.style.color = '#000';
          }
        }}
        onMouseLeave={(e) => {
          if (!isFeatured) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#242424';
            e.currentTarget.style.color = '#E8E8E8';
          }
        }}
      >
        <span>GET STARTED</span>
        <span>›</span>
      </button>
    </div>
  );
}

export function PricingSection({ currency }: PricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [modal, setModal] = useState<ServiceTier | null>(null);

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const getPrice = (tier: ServiceTier) =>
    currency === 'ngn' ? `₦${tier.ngn}` : `$${tier.usd}`;

  return (
    <>
      <section ref={sectionRef} style={{ background: '#060606' }}>
        {categories.map((cat, ci) => (
          <div
            key={cat.id}
            style={{
              borderTop: ci === 0 ? 'none' : '1px solid #191919',
            }}
          >
            {/* Category header */}
            <div
              className="reveal"
              style={{
                padding: '3rem 2rem 2rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid #191919',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: '#2A2A2A',
                  textTransform: 'uppercase',
                }}>
                  [{String(ci + 1).padStart(2, '0')}]
                </span>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                  letterSpacing: '-0.04em',
                  color: '#E8E8E8',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}>
                  {cat.label}
                </h2>
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: '#2A2A2A',
                textTransform: 'uppercase',
              }}>
                {cat.rev} // {cat.tiers.length} MODULES
              </span>
            </div>

            {/* Cards grid — use gap:1px + parent bg trick for dividers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '1px',
                background: '#191919',
              }}
            >
              {cat.tiers.map((tier, ti) => (
                <PricingCard
                  key={tier.id}
                  tier={tier}
                  currency={currency}
                  onContact={(t) => setModal(t)}
                  index={ti}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Bottom strip */}
        <div style={{
          borderTop: '1px solid #191919',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: '#2A2A2A',
            textTransform: 'uppercase',
          }}>
            ALL PRICES EXCLUDING HOSTING & DOMAIN — CUSTOM QUOTES AVAILABLE
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[...Array(9)].map((_, i) => (
              <span key={i} style={{ width: 4, height: 4, background: '#1A1A1A', display: 'inline-block' }} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact modal */}
      <ContactModal
        open={!!modal}
        packageTitle={modal?.title ?? ''}
        packagePrice={modal ? getPrice(modal) : ''}
        onClose={() => setModal(null)}
      />
    </>
  );
}
