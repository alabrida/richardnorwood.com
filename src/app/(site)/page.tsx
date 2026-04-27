import HeroSection from '@/components/sections/HeroSection'
import IdeologySection from '@/components/sections/IdeologySection'
import AboutSection from '@/components/sections/AboutSection'
import homepageData from '../../../content/homepage.json'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Guide & Revenue Architecture Advisor | Richard Norwood, PMP',
  description: 'Richard Norwood, PMP — Guide who helps agencies and service businesses move from scattered activity to an orchestrated commercial system that is visible, governable, and easier to improve over time.',
  path: '/',
})

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url: 'https://richardnorwood.com/',
    isPartOf: {
      '@id': 'https://richardnorwood.com/#website'
    },
    about: {
      '@id': 'https://richardnorwood.com/#organization'
    }
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection data={homepageData.hero} />
      <IdeologySection data={homepageData.ideology} />
      <AboutSection data={homepageData.about} />
    </>
  )
}
