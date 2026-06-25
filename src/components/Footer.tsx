import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid #191919',
      background: '#060606',
    }}>
      {/* Main footer content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1px',
        background: '#191919',
        borderBottom: '1px solid #191919',
      }}>
        {/* Brand column */}
        <div style={{ background: '#060606', padding: '3rem 2rem' }}>
          <Image
            src="/logo_white.png"
            alt="CyberSage"
            width={56}
            height={56}
            style={{ objectFit: 'contain', marginBottom: '1.5rem' }}
          />
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.8rem',
            color: '#4A4A4A',
            lineHeight: 1.7,
            maxWidth: 260,
          }}>
            CyberSage engineers digital experiences that convert, perform, and endure. Remote-first — serving clients globally.
          </p>
        </div>

        {/* Services column */}
        <div style={{ background: '#060606', padding: '3rem 2rem' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#C8952A',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            [ SERVICES ]
          </div>
          {['Landing Page', 'Personal Portfolio', 'Corporate Website', 'E-Commerce', 'Blog / CMS', 'Custom Development'].map((s) => (
            <div key={s} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem',
              color: '#3A3A3A',
              marginBottom: '0.6rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ color: '#242424', fontFamily: 'monospace', fontSize: '0.7rem' }}>›</span>
              {s}
            </div>
          ))}
        </div>

        {/* Contact column */}
        <div style={{ background: '#060606', padding: '3rem 2rem' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#C8952A',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            [ CONTACT ]
          </div>
          {[
            { label: 'EMAIL', value: 'abakwecarrington@gmail.com', href: 'mailto:abakwecarrington@gmail.com' },
            { label: 'PHONE', value: '+234 702 549 5506', href: 'tel:+2347025495506' },
    { label: 'LOCATION', value: 'Remote — Worldwide', href: undefined },
            { label: 'AVAILABILITY', value: 'Mon–Sat, 09:00–18:00 WAT', href: undefined },
          ].map(({ label, value, href }) => (
            <div key={label} style={{ marginBottom: '1.25rem' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: '#2A2A2A',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}>
                {label}
              </div>
              {href ? (
                <a href={href} style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.8rem',
                  color: '#4A4A4A',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#C8952A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#4A4A4A'; }}
                >
                  {value}
                </a>
              ) : (
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#4A4A4A' }}>
                  {value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA column */}
        <div style={{ background: '#060606', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              letterSpacing: '-0.04em',
              color: '#E8E8E8',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              Ready to Build?
            </div>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem',
              color: '#4A4A4A',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Select a package above or reach out for a custom scope. Every project starts with a free 30-minute discovery call.
            </p>
          </div>
          <a
            href="mailto:abakwecarrington@gmail.com?subject=Project%20Inquiry"
            style={{
              display: 'block',
              padding: '1rem 1.5rem',
              background: '#C8952A',
              color: '#000',
              textDecoration: 'none',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textAlign: 'center',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            START A PROJECT ›
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: '#2A2A2A',
          textTransform: 'uppercase',
        }}>
          © {year} CyberSage — All Rights Reserved
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: '#1A1A1A',
          textTransform: 'uppercase',
        }}>
          BUILT WITH PRECISION // DEPLOYED WITH INTENT
        </span>
      </div>
    </footer>
  );
}
