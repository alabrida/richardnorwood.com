import React from 'react'
import CalculatorForm from '@/components/forms/CalculatorForm'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Revenue Health Check | Richard Norwood, PMP',
  description: 'A short diagnostic to identify where your commercial system is strongest — and where friction is costing you the most.',
}

export default function CalculatorPage() {
  return (
    <>
      <Toaster position="top-center" theme="dark" richColors />
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) var(--space-4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)', maxWidth: 800 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
            Revenue Health Check
          </h1>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
            Answer a few questions to see where your commercial system is strongest — and where friction is costing you the most.
          </p>
        </div>

        <CalculatorForm />

      </main>
    </>
  )
}
