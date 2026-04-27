import React from 'react'
import ServicesHero from '@/components/sections/ServicesHero'
import ServiceTiers from '@/components/sections/ServiceTiers'
import TimelineSection from '@/components/sections/TimelineSection'
import ServicesCTA from '@/components/sections/ServicesCTA'
import servicesData from '../../../../content/services.json'

export const metadata = {
  title: 'Services | Richard Norwood, PMP',
  description: 'Align. Build. Command. Three phases to turn scattered growth into a commercial system your team can run.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero data={servicesData.hero} />
      <ServiceTiers data={servicesData.tiers} />
      <TimelineSection data={servicesData.timeline} />
      <ServicesCTA />
    </>
  )
}

