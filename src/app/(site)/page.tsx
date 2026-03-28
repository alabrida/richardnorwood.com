import Link from 'next/link';

export const metadata = {
  title: 'Richard Norwood, PMP — Revenue Architect',
  description:
    'Revenue Architecture for the Modern Builder. Identify your revenue leaks and orchestrate your commercial engine with a certified PMP.',
};

export default function HomePage() {
  return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'center' as const,
          padding: 'var(--space-8)',
          paddingTop: 'calc(var(--space-20) + var(--space-20))',
          gap: 'var(--space-6)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          <span className="gradient-text">Revenue Architecture</span>
          <br />
          for the Modern Builder
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          Identify your revenue leaks. Orchestrate your commercial engine.
          Build a unified system that converts.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
          <Link
            href="/calculator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-inverse)',
              background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              transition: 'transform var(--duration-fast) var(--ease-spring)',
            }}
          >
            Get Your EKG
          </Link>

          <Link
            href="/desktop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              transition: 'all var(--duration-fast) var(--ease-out)',
            }}
          >
            Launch Desktop Experience
          </Link>
        </div>

        <div className="stage-bar" style={{ width: '200px', borderRadius: 'var(--radius-full)', marginTop: 'var(--space-8)' }} />
      </div>
  );
}
