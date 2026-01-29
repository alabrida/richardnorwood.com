import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 md:py-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block text-xl font-display font-bold text-white tracking-tighter mb-4">
                            RICHARD NORWOOD
                        </Link>
                        <p className="text-sm text-zinc-400 max-w-xs">
                            Architecting Revenue Engines for the modern enterprise. Stop guessing, start scaling.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="/rjat" className="text-sm text-zinc-400 hover:text-white">RJAT Engine</Link></li>
                            <li><Link href="/blog" className="text-sm text-zinc-400 hover:text-white">Insights (Blog)</Link></li>
                            <li><Link href="/pricing" className="text-sm text-zinc-400 hover:text-white">Pricing</Link></li>
                            <li><Link href="/audit" className="text-sm text-zinc-400 hover:text-white">The Eligibility Calculator</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-sm text-zinc-400 hover:text-white">About Me</Link></li>
                            <li><Link href="/services" className="text-sm text-zinc-400 hover:text-white">Partnership</Link></li>
                            <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-sm text-zinc-400 hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-zinc-400 hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <NewsletterForm />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8">
                    <p className="text-xs text-zinc-500">
                        &copy; {new Date().getFullYear()} Richard Norwood. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        {/* Social Icons Placeholder */}
                        <div className="w-5 h-5 bg-zinc-800 rounded-full" />
                        <div className="w-5 h-5 bg-zinc-800 rounded-full" />
                        <div className="w-5 h-5 bg-zinc-800 rounded-full" />
                    </div>
                </div>
            </Container>
        </footer>
    );
}
