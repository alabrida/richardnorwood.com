import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { ContactInfo } from "@/components/sections/ContactInfo";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden selection:bg-emerald-500/30">
            <Header />
            <main className="flex-grow">
                <ContactHero />

                <section className="pb-24">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            <ContactForm />
                            <CalendlyEmbed />
                        </div>
                    </Container>
                </section>

                <ContactInfo />
            </main>
            <Footer />
        </div>
    );
}
