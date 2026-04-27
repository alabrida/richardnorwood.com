import React from 'react'
import CalculatorForm from '@/components/forms/CalculatorForm'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Commercial EKG | Richard Norwood, PMP',
  description: 'Answer a few diagnostic questions to identify where friction, weak handoffs, and missing proof are interrupting your revenue journey.',
}

export default function CalculatorPage() {
  return (
    <>
      <Toaster position="top-center" theme="dark" richColors />
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) var(--space-4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)', maxWidth: 800 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
            The Commercial EKG
          </h1>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
            The Commercial EKG identifies where friction, weak handoffs, and missing proof are interrupting your revenue journey.
            Answer these diagnostic questions to establish your baseline and determine what to fix first.
          </p>
        </div>

        <CalculatorForm />

      </main>
    </>
  )
}
