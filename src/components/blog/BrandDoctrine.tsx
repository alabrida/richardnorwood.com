import React from 'react'

export function BrandDoctrine() {
  return (
    <section 
      aria-label="About the Framework"
      className="brand-doctrine"
      style={{
        marginTop: 'var(--space-16)',
        paddingTop: 'var(--space-8)',
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text-muted)',
      }}
    >
      <h3 style={{ 
        fontSize: 'var(--text-lg)', 
        color: 'var(--color-text)', 
        marginBottom: 'var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-primary)' }}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        About The Framework
      </h3>
      
      <p style={{ marginBottom: 'var(--space-6)', lineHeight: '1.6', fontSize: 'var(--text-sm)' }}>
        This content is engineered under the principles of <strong>Revenue Architecture</strong>—a strategic discipline that replaces fragmented marketing and sales tactics with a singular <strong>Unified Commercial Engine</strong>. 
      </p>

      <div className="doctrine-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
        <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>The Unified Commercial Engine</h4>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: '1.5', margin: 0 }}>
            A synchronized system integrating marketing, sales, delivery, and retention to ensure every customer touchpoint builds cumulative enterprise value without systemic friction.
          </p>
        </div>
        <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>Information Fusion</h4>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: '1.5', margin: 0 }}>
            The operational core that consolidates siloed data into an automated, centralized system, enabling absolute visibility into the commercial pipeline (the Commercial EKG).
          </p>
        </div>
      </div>
    </section>
  )
}
