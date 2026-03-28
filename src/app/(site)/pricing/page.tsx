import React from 'react'
import PricingHero from '@/components/sections/PricingHero'
import FeaturesBreakdown from '@/components/sections/FeaturesBreakdown'
import PricingGrid from '@/components/sections/PricingGrid'
import ComparisonTable from '@/components/sections/ComparisonTable'
import PricingFAQ from '@/components/sections/PricingFAQ'
import pricingData from '../../../../content/pricing.json'

export const metadata = {
  title: 'Pricing & Packages | Richard Norwood',
  description: 'Simple, transparent pricing for Revenue Architecture bridging.',
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
          text: 'Phase II is focused on generating intent through landing pages and active marketing. Phase III transfers everything over to your own sovereign AWS/Cloud infrastructure so you own the code explicitly without Alabrida holding it.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I cancel at any time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Phase engagements are month-to-month after the initial commitment period is met.'
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
      price: tier.price,
      priceCurrency: 'USD'
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
      <FeaturesBreakdown />
      <ComparisonTable />
      <PricingFAQ />
    </>
  )
}
