'use client';

import { Container } from '@/components/layout';

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: The Context */}
                    <div>
                        <div className="inline-block px-3 py-1 mb-6 border border-[var(--color-cta)] text-[var(--color-cta)] font-mono text-xs uppercase tracking-widest">
                            Initiate Signal
                        </div>
                        <h1 className="text-5xl font-bold mb-8">
                            Stop Random Acts <br />
                            <span className="text-gradient">of Marketing.</span>
                        </h1>
                        <div className="prose prose-lg prose-invert text-[var(--color-muted)]">
                            <p>
                                You don't need another quote for a website. You need a **Commercial Diagnosis**.
                            </p>
                            <p>
                                Most businesses are firing on only two cylinders. We help you build a **Unified Commercial Engine** that turns strangers into customers (and customers into advocates) on autopilot.
                            </p>
                            <div className="mt-8 p-6 glass border-l-4 border-[var(--color-primary)] rounded-r-[var(--radius-lg)]">
                                <h4 className="text-[var(--color-foreground)] font-bold mb-2">Ready for The 90-Day Rhythm?</h4>
                                <p className="text-sm">
                                    We only accept 5 Tier 1 (Build) partners per quarter to ensure quality.
                                    Fill out the protocol below to see if you qualify.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Form */}
                    <div className="glass p-8 rounded-[var(--radius-2xl)] shadow-xl">
                        <h3 className="text-2xl font-bold mb-6">Discovery Protocol</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-[var(--color-muted)]">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-[var(--color-muted)]">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-[var(--color-muted)]">Work Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-[var(--color-muted)]">Website URL</label>
                                <input type="url" placeholder="https://" className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-[var(--color-muted)]">Current Revenue Stage</label>
                                <select className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-[var(--color-foreground)]">
                                    <option>Select Stage...</option>
                                    <option>Pre-Revenue (Building)</option>
                                    <option>$0 - $10k / month (Validating)</option>
                                    <option>$10k - $50k / month (Scaling)</option>
                                    <option>$50k+ / month (Optimizing)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-[var(--color-muted)]">Biggest Leak?</label>
                                <textarea rows={4} placeholder="e.g. Lots of traffic, no leads..." className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"></textarea>
                            </div>

                            <button className="w-full py-4 bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white font-bold rounded-[var(--radius-lg)] transition-all shadow-lg hover:-translate-y-1">
                                Send Signal
                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
