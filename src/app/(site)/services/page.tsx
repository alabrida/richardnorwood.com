import React from 'react'
import PageHero from '@/components/sections/PageHero'
import ServiceTiers from '@/components/sections/ServiceTiers'
import TimelineSection from '@/components/sections/TimelineSection'
import ServicesCTA from '@/components/sections/ServicesCTA'
import servicesData from '../../../../content/services.json'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Services | Richard Norwood, PMP',
  description: 'Align. Build. Command. Three phases to turn scattered growth into a commercial system your team can run.',
  path: '/services',
})

export default function ServicesPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Revenue Architecture Consulting',
    description: metadata.description,
    provider: {
      '@id': 'https://richardnorwood.com/#organization'
    },
    serviceType: 'Consulting',
    areaServed: { '@type': 'Country', name: 'United States' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Strategic Partnership Phases',
      itemListElement: servicesData.tiers.map((tier) => ({
        '@type': 'Offer',
        name: tier.name,
        description: tier.description
      }))
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://richardnorwood.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://richardnorwood.com/services'
      }
    ]
  }

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <PageHero title={servicesData.hero.title} subtitle={servicesData.hero.subtitle} />
      <ServiceTiers data={servicesData.tiers} />
      <TimelineSection data={servicesData.timeline} />
      <ServicesCTA />
    </>
  )
}

