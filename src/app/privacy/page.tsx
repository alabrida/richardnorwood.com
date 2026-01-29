import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden selection:bg-emerald-500/30">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <Container>
                    <div className="max-w-3xl mx-auto prose prose-invert prose-stone">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter mb-8">
                            Privacy Policy
                        </h1>
                        <p className="text-zinc-400 text-sm mb-12">Last Updated: January 28, 2026</p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Introduction</h2>
                        <p className="text-zinc-400 mb-6">
                            Richard Norwood ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (richardnorwood.com) and tell you about your privacy rights and how the law protects you.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. The Data We Collect</h2>
                        <p className="text-zinc-400 mb-6">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services (e.g., interaction with the Revenue Journey Assessment Tool).</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. How We Use Your Data</h2>
                        <p className="text-zinc-400 mb-6">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-2">
                            <li>To provide the services you have requested (e.g., Assessment Reports).</li>
                            <li>To manage our relationship with you.</li>
                            <li>To improve our website, products/services, marketing or customer relationships.</li>
                            <li>To send you our newsletter and insights (only if you have opted in).</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Data Security</h2>
                        <p className="text-zinc-400 mb-6">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Contact Details</h2>
                        <p className="text-zinc-400 mb-6">
                            If you have any questions about this privacy policy or our privacy practices, please contact us via the form on our Contact page.
                        </p>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
