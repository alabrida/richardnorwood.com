import React from 'react'
import ServicesHero from '@/components/sections/ServicesHero'
import ServiceTiers from '@/components/sections/ServiceTiers'
import TimelineSection from '@/components/sections/TimelineSection'
import CurriculumSection from '@/components/sections/CurriculumSection'
import ServicesCTA from '@/components/sections/ServicesCTA'
import servicesData from '../../../../content/services.json'

export const metadata = {
  title: 'The Partnership | Alabrida Revenue Architecture',
  description: 'The definitive 90-Day Partnership to transition out of Frankenstein Stacks and into a Unified Sovereign Engine.',
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
