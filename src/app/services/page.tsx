"use client";

import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServiceTiers } from "@/components/sections/ServiceTiers";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CurriculumSection } from "@/components/sections/CurriculumSection";

export default function ServicesPage() {
    return (
        <main className="bg-black min-h-screen">
            <ServicesHero />
            <ServiceTiers />
            <TimelineSection />
            <CurriculumSection />

            {/* Final CTA Spacer */}
            <div className="pb-32" />
        </main>
    );
}
