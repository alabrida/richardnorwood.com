import Script from 'next/script'

interface SchemaOrgProps {
  type?: 'website' | 'service' | 'faq' | 'article'
  data?: Record<string, unknown>
}

// Base ProfessionalService + Person schema for site-wide use
const baseSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://richardnorwood.com/#organization',
      name: 'Richard Norwood, PMP - Revenue Architecture',
      url: 'https://richardnorwood.com',
      description: 'Strategic consulting for revenue architecture, commercial infrastructure, and operational sovereignty. 90-day to 12-month partnership engagements.',
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
      serviceType: [
        'Revenue Architecture',
        'Commercial Strategy',
        'Project Management',
        'Digital Infrastructure',
      ],
      founder: {
        '@id': 'https://richardnorwood.com/#person',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Strategic Partnership Tiers',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Phase I: Diagnostic EKG',
            description: 'Foundational 90-day engagement for revenue infrastructure assessment and optimization.',
          },
          {
            '@type': 'Offer',
            name: 'Phase II: Engine Orchestration',
            description: '6-month engagement for full revenue engine orchestration and marketing infrastructure.',
          },
          {
            '@type': 'Offer',
            name: 'Phase III: Unified Engine',
            description: '12-month engagement for complete sovereign infrastructure migration and operational independence.',
          },
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://richardnorwood.com/#person',
      name: 'Richard Norwood',
      jobTitle: 'Revenue Architect & PMP',
      url: 'https://richardnorwood.com',
      sameAs: [
        'https://linkedin.com/in/richardnorwood',
        'https://x.com/richardnorwood',
      ],
      knowsAbout: [
        'Revenue Architecture',
        'Project Management',
        'Commercial Strategy',
        'Information Fusion',
        'Digital Infrastructure',
      ],
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional Certification',
        name: 'Project Management Professional (PMP)',
      },
    },
  ],
}

// Website schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Richard Norwood, PMP',
  url: 'https://richardnorwood.com',
  description: 'Revenue Architecture & Commercial Strategy Consulting',
  publisher: {
    '@id': 'https://richardnorwood.com/#organization',
  },
}

export default function SchemaOrg({ type = 'website', data }: SchemaOrgProps) {
  let schema: Record<string, unknown>

  switch (type) {
    case 'website':
      schema = { ...baseSchema }
      break
    case 'service':
      schema = {
        ...baseSchema,
        '@graph': [
          ...baseSchema['@graph'],
          websiteSchema,
        ],
      }
      break
    case 'faq':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data?.questions || [],
      }
      break
    case 'article':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        ...data,
        author: {
          '@id': 'https://richardnorwood.com/#person',
        },
        publisher: {
          '@id': 'https://richardnorwood.com/#organization',
        },
      }
      break
    default:
      schema = baseSchema
  }

  return (
    <Script
      id={`schema-org-${type}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
