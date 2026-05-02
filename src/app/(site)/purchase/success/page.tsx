import React from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Audit Access Secured | Richard Norwood, PMP',
  description: 'Your 22-point structural audit is now being provisioned. Check your email for access instructions.',
  path: '/purchase/success',
  noIndex: true,
});

export default function PurchaseSuccessPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#060b16' }}>
      <Container>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: 'var(--space-20) var(--space-8)', background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: 'rgba(32, 201, 151, 0.1)', color: 'var(--color-accent)', fontSize: 40, marginBottom: 'var(--space-10)', border: '1px solid rgba(32, 201, 151, 0.3)' }}>
            ✓
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--space-6)' }}>
            Access Secured.
          </h1>
          
          <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-xl)', lineHeight: 1.6, marginBottom: 'var(--space-12)' }}>
            Your strategic inputs have been received. My system is now generating your tailored 22-point diagnostic report and preparing your private client portal.
          </p>

          <div style={{ background: 'rgba(240, 180, 41, 0.05)', border: '1px solid rgba(240, 180, 41, 0.1)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', textAlign: 'left', marginBottom: 'var(--space-12)' }}>
            <h3 style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-4)' }}>
              Next Steps in Your Journey:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <li style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-secondary)' }}>01.</span> Analyzing Technical Infrastructure (In Progress)
              </li>
              <li style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-secondary)' }}>02.</span> Preparing Your Custom Diagnostic Dashboard
              </li>
              <li style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-secondary)' }}>03.</span> Access Credentials Delivered (Via Email)
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              Please check your inbox in approximately 10-15 minutes for your secure login link.
            </p>
            <Link href="/" style={{ display: 'inline-block', background: 'var(--color-secondary)', color: 'var(--color-text-inverse)', padding: '14px 40px', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 'bold', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(240, 180, 41, 0.3)' }}>
              Return to Homepage
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
