import HeroSection from '@/components/sections/HeroSection'
import IdeologySection from '@/components/sections/IdeologySection'
import AboutSection from '@/components/sections/AboutSection'
import homepageData from '../../../content/homepage.json'

export const metadata = {
  title: 'Guide & Revenue Architecture Advisor | Richard Norwood, PMP',
  description: 'Richard Norwood, PMP — Guide who helps agencies and service businesses move from scattered activity to an orchestrated commercial system that is visible, governable, and easier to improve over time.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection data={homepageData.hero} />
      <IdeologySection data={homepageData.ideology} />
      <AboutSection data={homepageData.about} />
    </>
  )
}
