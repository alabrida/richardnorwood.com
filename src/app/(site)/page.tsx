import HeroSection from '@/components/sections/HeroSection'
import IdeologySection from '@/components/sections/IdeologySection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import AboutSection from '@/components/sections/AboutSection'
import homepageData from '../../../content/homepage.json'

export const metadata = {
  title: 'Revenue Architecture & Commercial Strategy | Richard Norwood',
  description: 'Identify your leaks and orchestrate your engine with a certified PMP. Stop marketing decorating and start revenue engineering.',
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
