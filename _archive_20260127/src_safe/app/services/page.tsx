'use client';

import { ServicesHero } from '@/components/sections/ServicesHero';
import { ServiceTiers } from '@/components/sections/ServiceTiers';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { CurriculumSection } from '@/components/sections/CurriculumSection';
import { ServicesCTA } from '@/components/sections/ServicesCTA';

export default function ServicesPage() {
    return (
        <main>
            <ServicesHero />
            <ServiceTiers />
            <TimelineSection />
            <CurriculumSection />
            <ServicesCTA />
        </main>
    );
}
