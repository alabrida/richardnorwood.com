import React from 'react'
import PageHero from '@/components/sections/PageHero'
import PricingGrid from '@/components/sections/PricingGrid'
import PricingFAQ from '@/components/sections/PricingFAQ'
import CallButton from '@/components/ui/CallButton'
import pricingData from '../../../../content/pricing.json'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Pricing | Richard Norwood, PMP',
  description: 'Align. Build. Command. Choose the engagement that matches where your business is today.',
  path: '/pricing',
})

export default function PricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What's the difference between Build and Command?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Build installs the operating layer — visibility, automation, and cross-team alignment using the tools you already have. Command strengthens governance, simplifies the stack, and transitions the system so your team runs it independently.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I cancel at any time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Engagements are month-to-month after the initial commitment period is met.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I get access to a client portal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All active clients receive a dedicated portal with project tracking, asset delivery, and direct communication.'
        }
      },
      {
        '@type': 'Question',
        name: 'What happens in the first 7 days?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Within 48 hours, we establish your secure client portal and communication hub. By day 7, we complete the initial Commercial EKG scan and identify the first 3 "High-Friction" points to fix immediately.'
        }
      }
    ]
  }

  const offerLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Revenue Architecture',
    provider: { '@type': 'Person', name: 'Richard Norwood' },
    offers: pricingData.tiers.map(tier => ({
      '@type': 'Offer',
      name: tier.name,
      description: `${tier.term} strategic partnership engagement`,
    }))
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={offerLd} />
      <PageHero title="Align. Build. Command." subtitle="Choose the engagement that matches where your business is today." />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto var(--space-12)', textAlign: 'center', padding: '0 var(--space-4)' }}>
        <p style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>
          "{pricingData.risk_reversal}"
        </p>
      </div>

      <PricingGrid data={pricingData.tiers} />
      <PricingFAQ />
      
      <section style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-4) var(--space-24)', background: 'var(--color-bg)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Still Have Questions?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
          If you need a custom scope or have specific questions about the partnership tiers, let's talk.
        </p>
        <CallButton size="large" />
      </section>
    </>
  )
}
