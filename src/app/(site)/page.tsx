import HeroSection from '@/components/sections/HeroSection'
import IdeologySection from '@/components/sections/IdeologySection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import AboutSection from '@/components/sections/AboutSection'
import homepageData from '../../../content/homepage.json'

export const metadata = {
  title: 'Revenue Architect | Unified Commercial Engine | Richard Norwood, PMP',
  description: 'Richard Norwood, PMP — Revenue Architect installing Unified Commercial Engines that use Information Fusion to eliminate the Manual Entry Tax and turn your digital presence into a high-value financial asset.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection data={homepageData.hero} />
      <IdeologySection data={homepageData.ideology} />
      <SocialProofSection data={homepageData.social_proof} />
      <AboutSection data={homepageData.about} />
    </>
  )
}
