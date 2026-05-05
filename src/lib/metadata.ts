import type { Metadata } from 'next'
import { SITE_NAME, SOCIAL_IMAGE_URL, siteUrl } from '@/lib/site'

interface MetadataInput {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  noIndex,
}: MetadataInput): Metadata {
  const url = siteUrl(path)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images: [
        {
          url: SOCIAL_IMAGE_URL,
          width: 2736,
          height: 2740,
          alt: 'Richard Norwood, PMP, Revenue Architect',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE_URL],
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}
