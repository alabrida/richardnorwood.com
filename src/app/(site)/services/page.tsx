import React from 'react'
import Link from 'next/link'
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
      
      <section style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', background: 'rgba(32, 201, 151, 0.03)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-text-subtle)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
          Not ready to book a tier yet? Start with the structural map.
        </p>
        <Link 
          href="/blueprint" 
          className="pulse-green-glow"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            padding: 'var(--space-4) var(--space-10)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            fontSize: 'var(--text-base)',
            color: 'var(--color-text)',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            transition: 'all var(--duration-fast)'
          }}
        >
          Get the 5-Stage Blueprint
        </Link>
      </section>

      <TimelineSection data={servicesData.timeline} />
      <ServicesCTA />
    </>
  )
}
