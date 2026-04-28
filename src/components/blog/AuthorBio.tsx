import React from 'react'
import Link from 'next/link'

export function AuthorBio() {
  return (
    <div className="author-bio" style={{ 
      display: 'flex', 
      gap: 'var(--space-6)', 
      padding: 'var(--space-8)', 
      background: 'var(--color-surface-elevated)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)',
      marginTop: 'var(--space-16)',
      alignItems: 'flex-start'
    }}>
      <div className="author-avatar" style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-background)',
        fontSize: 'var(--text-2xl)',
        fontWeight: 'bold',
        flexShrink: 0
      }}>
        RN
      </div>
      <div>
        <h3 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-xl)', color: 'var(--color-text)' }}>
          Richard Norwood, PMP
        </h3>
        <p style={{ margin: '0 0 var(--space-4)', color: 'var(--color-primary)', fontSize: 'var(--text-sm)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
          Revenue Architecture Advisor
        </p>
        <p style={{ margin: '0 0 var(--space-4)', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
          Richard specializes in uncovering hidden friction points in the customer journey. With over 15 years of experience spanning continuous improvement and sales leadership, he brings PMP-certified delivery discipline to fix systemic revenue leaks and turn strategy into measurable outcomes.
        </p>
        <Link 
          href="https://www.linkedin.com/in/richardnorwoodpmp"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--color-text)',
            fontWeight: 'bold',
            textDecoration: 'none',
            borderBottom: '1px solid var(--color-text)',
            paddingBottom: '2px',
            fontSize: 'var(--text-sm)'
          }}
        >
          Connect on LinkedIn →
        </Link>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .author-bio {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}
