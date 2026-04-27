import React from 'react'
import CalculatorForm from '@/components/forms/CalculatorForm'
import PageHero from '@/components/sections/PageHero'
import { Toaster } from 'sonner'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Revenue Health Check | Richard Norwood, PMP',
  description: 'A short diagnostic to identify where your commercial system is strongest — and where friction is costing you the most.',
  path: '/calculator',
})

export default function CalculatorPage() {
  return (
    <>
      <Toaster position="top-center" theme="dark" richColors />
      
      <PageHero 
        title="Revenue Health Check"
        subtitle="Answer a few questions to see where your commercial system is strongest — and where friction is costing you the most."
      />

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 var(--space-4) var(--space-24)' }}>
        <CalculatorForm />
      </main>
    </>
  )
}
