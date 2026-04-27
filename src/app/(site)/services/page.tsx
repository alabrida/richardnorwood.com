import React from 'react'
import ServicesHero from '@/components/sections/ServicesHero'
import ServiceTiers from '@/components/sections/ServiceTiers'
import TimelineSection from '@/components/sections/TimelineSection'
import CurriculumSection from '@/components/sections/CurriculumSection'
import ServicesCTA from '@/components/sections/ServicesCTA'
import servicesData from '../../../../content/services.json'

export const metadata = {
  title: 'Strategic Partnership | Richard Norwood, PMP',
  description: 'Strategic partnership engagements — 90-day diagnostic, 6-month orchestration, and 12-month transition to a stronger commercial system.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero data={servicesData.hero} />
      <ServiceTiers data={servicesData.tiers} />
      <TimelineSection data={servicesData.timeline} />
      <CurriculumSection data={servicesData.curriculum} />
      <ServicesCTA />
    </>
  )
}
