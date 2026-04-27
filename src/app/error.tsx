'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        fontSize: 'var(--text-3xl)',
        color: 'var(--color-text)',
        marginBottom: 'var(--space-4)',
      }}>
        Something Went Wrong
      </h1>
      <p style={{
        color: 'var(--color-text-subtle)',
        fontSize: 'var(--text-lg)',
        maxWidth: '500px',
        lineHeight: 'var(--leading-relaxed)',
        marginBottom: 'var(--space-8)',
      }}>
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        <button
          onClick={reset}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-secondary)',
            color: 'var(--color-bg)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'transparent',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
