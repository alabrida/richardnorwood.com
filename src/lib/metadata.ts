import type { Metadata } from 'next'

interface MetadataInput {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

const BASE_URL = 'https://richardnorwood.com'

export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  noIndex,
}: MetadataInput): Metadata {
  const url = `${BASE_URL}${path}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Richard Norwood',
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}
