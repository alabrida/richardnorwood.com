import React from 'react'
import PricingHero from '@/components/sections/PricingHero'
import PricingGrid from '@/components/sections/PricingGrid'
import PricingFAQ from '@/components/sections/PricingFAQ'
import pricingData from '../../../../content/pricing.json'

export const metadata = {
  title: 'Strategic Partnership | Richard Norwood, PMP',
  description: 'Partnership tiers for Revenue Architecture consulting. 90-day, 6-month, and 12-month strategic engagements.',
}

export default function PricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Phase II and Phase III?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Phase II focuses on installing the Managed Nervous System — creating the first reliable layer of visibility, automation, and structured follow-through using the tools your business already has. Phase III strengthens governance, rationalizes the tool stack, and prepares the transition to deeper architecture work or owned infrastructure when the business is ready.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I cancel at any time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Phase engagements are month-to-month after the initial commitment period is met.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I get access to a client portal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all active partnership clients receive a dedicated client portal with project tracking, asset delivery, and direct communication channels with your Guide.'
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
