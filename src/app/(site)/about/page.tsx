import React from 'react'
import AboutPageClient from '@/components/sections/AboutPageClient'
import aboutData from '../../../../content/about.json'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'About Richard Norwood, PMP | Revenue Enablement & Marketing Consultant',
  description: 'Richard Norwood is a certified Project Management Professional (PMP) and Revenue Architecture Advisor helping businesses optimize their buyer journey and commercial systems.',
  path: '/about',
})

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://richardnorwood.com/#person',
      name: 'Richard Norwood',
      jobTitle: 'Revenue Architecture Advisor',
      url: 'https://richardnorwood.com/about',
      sameAs: [
        'https://www.linkedin.com/in/richardnorwoodpmp'
      ],
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Jacksonville State University',
          sameAs: 'https://en.wikipedia.org/wiki/Jacksonville_State_University'
        }
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'certification',
          name: 'Project Management Professional (PMP)',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Project Management Institute'
          },
          url: 'https://www.credly.com/badges/08947dff-1909-4bc0-97c5-3228020092f8/public_url'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'certification',
          name: 'Google Data Analytics',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Google'
          },
          url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/E7WYXFS85H79'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'certification',
          name: 'Google Project Management',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Google'
          },
          url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/SNZ6T6MJZSVH'
        }
      ],
      knowsAbout: [
        'Revenue Enablement',
        'Project Management',
        'Marketing Consulting',
        'Sales Consulting',
        'Conversion Journey Optimization'
      ]
    }
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutPageClient data={aboutData} />
    </>
  )
}
