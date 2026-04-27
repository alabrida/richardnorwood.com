import React from 'react'
import PricingHero from '@/components/sections/PricingHero'
import PricingGrid from '@/components/sections/PricingGrid'
import PricingFAQ from '@/components/sections/PricingFAQ'
import pricingData from '../../../../content/pricing.json'

export const metadata = {
  title: 'Pricing | Richard Norwood, PMP',
  description: 'Align. Build. Command. Choose the engagement that matches where your business is today.',
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }}
      />
      <PricingHero />
      <PricingGrid data={pricingData.tiers} />
      <PricingFAQ />
    </>
  )
}
