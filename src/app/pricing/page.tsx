import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingHero } from "@/components/sections/PricingHero";
import { FeaturesBreakdown } from "@/components/sections/FeaturesBreakdown";
import { PricingGrid } from "@/components/sections/PricingGrid";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { PricingFAQ } from "@/components/sections/PricingFAQ";

export default function PricingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden selection:bg-indigo-500/30">
            <Header />
            <main className="flex-grow">
                <PricingHero />
                <FeaturesBreakdown />
                <PricingGrid />
                <ComparisonTable />
                <PricingFAQ />
            </main>
            <Footer />
        </div>
    );
}
