export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      background: '#060606',
      fontFamily: "'JetBrains Mono', monospace",
      gap: '1rem',
    }}>
      <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#CC2020', textTransform: 'uppercase' }}>
        [ ERROR 404 ]
      </div>
      <div style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 700, color: '#E8E8E8', letterSpacing: '-0.04em', lineHeight: 1 }}>
        404
      </div>
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#2A2A2A', textTransform: 'uppercase' }}>
        PAGE NOT FOUND
      </div>
      <a href="/" style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', border: '1px solid #242424', color: '#E8E8E8', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        ← RETURN HOME
      </a>
    </div>
  );
}
