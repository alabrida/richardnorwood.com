import React from 'react'
import ContactForm from '@/components/forms/ContactForm'
import GoogleCalendarEmbed from '@/components/ui/GoogleCalendarEmbed'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Strategy & Diagnostics | Alabrida Revenue Architecture',
  description: 'Book a strategy call or dispatch a signal to our orchestration team.',
}

export default function ContactPage() {
  return (
    <>
      <Toaster position="bottom-right" theme="dark" richColors />
      
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-24) var(--space-4) var(--space-12)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw + 1rem, 3.5rem)', color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
            Establish Comms
          </h1>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-lg)', maxWidth: 600, margin: '0 auto' }}>
            Whether you need a full engine diagnosis or you’re ready to execute the Alabrida Bridge, 
            capture your signal below or pick a slot on the calendar.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-12)', alignItems: 'stretch' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                Dispatch written signal
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
                Your data is routed directly into the Managed Nervous System for immediate evaluation.
              </p>
            </div>
            
            <ContactForm />

            {/* Gap Filler - Processing Information */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 'var(--space-4)', padding: 'var(--space-8)', background: 'var(--color-surface)', border: '1px solid var(--color-surface-elevated)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>
                Signal Processing Expectations
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>Priority parsing for existing partners and Stage 4/5 operations.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <span>All data is end-to-end secured before entering the architecture review.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                  <span>Expect initial diagnostic feedback within 24 standard operational hours.</span>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                Orchestrate a Call
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
                Bypass the queue and lock in a 30-minute commercial architecture session with Richard Norwood, PMP.
              </p>
            </div>
            
            <div style={{ flexGrow: 1, height: 850 }}>
              <GoogleCalendarEmbed />
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
