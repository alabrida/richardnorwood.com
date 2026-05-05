import HeroSection from '@/components/sections/HeroSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import IdeologySection from '@/components/sections/IdeologySection'
import AboutSection from '@/components/sections/AboutSection'
import BlogTeaser from '@/components/sections/BlogTeaser'
import homepageData from '../../../content/homepage.json'
import socialProofData from '../../../content/social-proof.json'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'
import { getAllPosts, decodeHtml } from '@/lib/wp'

export const metadata = buildMetadata({
  title: 'Guide & Revenue Architect | Richard Norwood, PMP',
  description: 'Richard Norwood, PMP — Guide who helps agencies and service businesses move from scattered activity to an orchestrated commercial system that is visible, governable, and easier to improve over time.',
  path: '/',
})

export default async function HomePage() {
  const wpPosts = await getAllPosts()
  
  const blogTeaserPosts = wpPosts.map(post => ({
    id: post.id,
    title: decodeHtml(post.title.rendered),
    slug: post.slug,
    date: post.date,
    excerpt: decodeHtml(post.excerpt.rendered.replace(/<[^>]*>?/gm, '')),
    category: 'Field Notes'
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url: 'https://www.richardnorwood.com/',
    isPartOf: {
      '@id': 'https://www.richardnorwood.com/#website'
    },
    about: {
      '@id': 'https://www.richardnorwood.com/#organization'
    }
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection data={homepageData.hero} />
      <SocialProofSection data={socialProofData} />
      <IdeologySection data={homepageData.ideology} />
      <AboutSection data={homepageData.about} />
      <BlogTeaser posts={blogTeaserPosts} />
    </>
  )
}
