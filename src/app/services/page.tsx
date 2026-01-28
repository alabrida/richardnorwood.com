
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServiceTiers } from "@/components/sections/ServiceTiers";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CurriculumSection } from "@/components/sections/CurriculumSection";
import { ServicesCTA } from "@/components/sections/ServicesCTA";

export default function ServicesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden selection:bg-indigo-500/30">
            <Header />
            <main className="flex-grow">
                <ServicesHero />
                <ServiceTiers />
                <TimelineSection />
                <CurriculumSection />
                <ServicesCTA />
            </main>
            <Footer />
        </div>
    );
}
