'use client';

const items = [
  'WEB DESIGN', '///', 'NEXT.JS', '///', 'THREE.JS', '///',
  'E-COMMERCE', '///', 'SEO OPTIMIZATION', '///', 'GSAP ANIMATION', '///',
  'TAILWIND CSS', '///', 'TYPESCRIPT', '///', 'PERFORMANCE FIRST', '///',
  'CMS INTEGRATION', '///', 'RESPONSIVE DESIGN', '///', 'PIXEL PERFECT', '///',
];

export function MarqueeStrip() {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        borderTop: '1px solid #191919',
        borderBottom: '1px solid #191919',
        background: '#060606',
        overflow: 'hidden',
        padding: '0.9rem 0',
      }}
    >
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: item === '///' ? '#C8952A' : '#2A2A2A',
              padding: '0 1.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
