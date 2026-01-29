import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CalculatorForm } from "@/components/forms/CalculatorForm";

export default function AuditPage() {
    return (
        <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden selection:bg-emerald-500/30">
            <Header />
            <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                <Container>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                            Architecture Audit
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Answer 5 high-impact questions to diagnose the health of your revenue engine and discover where you're losing money.
                        </p>
                    </div>

                    <CalculatorForm />
                </Container>
            </main>
            <Footer />
        </div>
    );
}
