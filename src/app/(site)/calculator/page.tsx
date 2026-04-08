import React from 'react'
import CalculatorForm from '@/components/forms/CalculatorForm'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Diagnostic Calculator | Alabrida Revenue Architecture',
  description: 'Compute your commercial viability and identify your precise leak score across your sales perimeter.',
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
            We&apos;ve developed a proprietary 250+ point diagnostic sequence to objectively grade your revenue flow. 
            Before we enter the boardroom, answer these 5 calibrator signals to arm our team with your operational baseline.
          </p>
        </div>

        <CalculatorForm />

      </main>
    </>
  )
}
