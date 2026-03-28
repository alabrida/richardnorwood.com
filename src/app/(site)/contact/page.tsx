import React from 'react'
import ContactForm from '@/components/forms/ContactForm'
import CalendlyEmbed from '@/components/ui/CalendlyEmbed'
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-12)', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                Dispatch written signal
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
                Your data is routed directly into the Managed Nervous System for immediate evaluation.
              </p>
            </div>
            
            <ContactForm />
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
            
            <div style={{ flexGrow: 1, minHeight: 600 }}>
              <CalendlyEmbed />
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
