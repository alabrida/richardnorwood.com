import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-12) var(--space-4)',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        color: 'var(--color-text)',
        marginBottom: 'var(--space-4)',
        lineHeight: 1,
      }}>
        404
      </h1>
      <p style={{
        color: 'var(--color-text-subtle)',
        fontSize: 'var(--text-xl)',
        maxWidth: '500px',
        lineHeight: 'var(--leading-relaxed)',
        marginBottom: 'var(--space-8)',
      }}>
        The page you requested could not be found. It may have been moved, deleted, or never existed.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-secondary)',
          color: 'var(--color-bg)',
          borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 'bold',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
