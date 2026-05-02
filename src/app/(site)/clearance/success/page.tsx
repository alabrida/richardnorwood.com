import React from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Security Clearance Verified | Richard Norwood, PMP',
  description: 'Your security clearance has been received. Your Revenue Journey dashboard is now being provisioned.',
  path: '/clearance/success',
  noIndex: true,
});

export default function ClearanceSuccessPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: '#060b16' }}>
      <Container>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: 'var(--space-12) var(--space-6)', background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(32, 201, 151, 0.1)', color: 'var(--color-accent)', fontSize: 32, marginBottom: 'var(--space-8)' }}>
            ✓
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
            Clearance Verified.
          </h1>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-lg)', lineHeight: 1.6, marginBottom: 'var(--space-10)' }}>
            Thank you. Your strategic input has been received. I am now finalizing your results and preparing your private dashboard for our upcoming session.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 'var(--text-xs)', letterSpacing: '0.1em' }}>
              Next Step: Strategic Review
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              If you haven't booked your discovery session yet, please do so now to finalize the review.
            </p>
            <div style={{ marginTop: 'var(--space-4)' }}>
              <a 
                href="https://calendar.google.com/calendar/u/0/appointments/schedules" 
                style={{ display: 'inline-block', background: 'var(--color-secondary)', color: 'var(--color-text-inverse)', padding: '12px 32px', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 'bold', transition: 'all 0.2s' }}
              >
                Book Discovery Session
              </a>
            </div>
            <Link href="/" style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-subtle)', fontSize: 'var(--text-sm)', textDecoration: 'underline' }}>
              Return to Homepage
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
