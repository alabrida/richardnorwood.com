
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IdeologySection } from "@/components/sections/IdeologySection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RubricMatrixSection } from "@/components/sections/RubricMatrixSection";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden selection:bg-white/20">
            <Header />
            <main className="flex-grow">
                <HeroSection />
                <RubricMatrixSection />
                <IdeologySection />
                <SocialProofSection />
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
}
