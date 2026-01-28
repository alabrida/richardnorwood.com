'use client';

import {
  HeroSection,
  IdeologySection,
  SocialProofSection,
  AboutSection
} from '@/components/sections';
import { DoctrineSection } from '@/components/sections/DoctrineSection';
import { RubricPreviewSection } from '@/components/sections/RubricPreviewSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <IdeologySection />
      <DoctrineSection />
      <RubricPreviewSection />
      <AboutSection />
    </main>
  );
}
