import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden selection:bg-orange-500/30">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <Container>
                    <div className="max-w-3xl mx-auto prose prose-invert prose-stone">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter mb-8">
                            Terms of Service
                        </h1>
                        <p className="text-zinc-400 text-sm mb-12">Last Updated: January 28, 2026</p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-zinc-400 mb-6">
                            By accessing and using this website (richardnorwood.com), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Intelletual Property</h2>
                        <p className="text-zinc-400 mb-6">
                            The "Revenue Journey" frameworks, the "5-Stage Standard," "RJAT" (Revenue Journey Assessment Tool), and all original content, features, and functionality are and will remain the exclusive property of Richard Norwood and its licensors. The Site is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Use License</h2>
                        <p className="text-zinc-400 mb-6">
                            Permission is granted to temporarily download one copy of the materials (information or software) on Richard Norwood's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Disclaimer</h2>
                        <p className="text-zinc-400 mb-6">
                            The materials on Richard Norwood's website are provided on an 'as is' basis. Richard Norwood makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                        <p className="text-zinc-400 mb-6">
                            Results from using our methodologies or the Assessment Tool may vary. Revenue engineering requires consistent execution and specific market conditions; we do not guarantee specific financial outcomes.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Governing Law</h2>
                        <p className="text-zinc-400 mb-6">
                            Any claim relating to Richard Norwood's website shall be governed by the laws of the State of [State] without regard to its conflict of law provisions.
                        </p>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
