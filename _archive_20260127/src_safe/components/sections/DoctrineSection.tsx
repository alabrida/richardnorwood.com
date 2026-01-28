'use client';

import { Container } from '@/components/layout';
import { motion } from 'framer-motion';

export function DoctrineSection() {
    return (
        <section className="py-24 bg-[var(--color-background)] border-t border-[var(--color-border)] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--color-card)] to-transparent pointer-events-none" />

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: The Manifesto */}
                    <div>
                        <div className="inline-block px-3 py-1 mb-6 border border-[var(--color-accent)] text-[var(--color-accent)] font-mono text-xs uppercase tracking-widest">
                            System Doctrine v2.1
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            The Copernican Revolution <br />
                            <span className="text-[var(--color-muted)]">of Revenue Growth</span>
                        </h2>

                        <div className="prose prose-lg prose-invert text-[var(--color-muted)]">
                            <p className="mb-6">
                                Growing a business has evolved into a capital-intensive, data-driven "team sport".
                                Traditional models are broken; they are like expensive racing cars firing on only two cylinders.
                            </p>
                            <p className="mb-6">
                                We reject the status quo of fragmented silos where marketing and sales "kick dirt" in each other’s faces.
                                We choose instead to build a <strong className="text-[var(--color-foreground)]">Unified Commercial Engine</strong>.
                            </p>
                            <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 italic text-[var(--color-foreground)] my-8">
                                "We do not build websites; we build Digital Sales Channels. We do not provide 'marketing'; we provide an Engineered System for Growth."
                            </blockquote>
                        </div>
                    </div>

                    {/* Right: The Pillars */}
                    <div className="space-y-8 mt-8 lg:mt-0">
                        {/* Pillar 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold font-mono">
                                    01
                                </div>
                                <h3 className="text-xl font-bold">Trust (The Guide)</h3>
                            </div>
                            <p className="text-[var(--color-muted)] leading-relaxed">
                                We move from promising "Value" to delivering "Impact." The journey begins at Mutual Commit and thrives through Onboarding, Adoption, and Expansion.
                            </p>
                        </motion.div>

                        {/* Pillar 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group p-8 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-secondary)] transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] font-bold font-mono">
                                    02
                                </div>
                                <h3 className="text-xl font-bold">Transparency (The Architect)</h3>
                            </div>
                            <p className="text-[var(--color-muted)] leading-relaxed">
                                We replace manual CRM entry with "Information Fusion." We architect the data layer for portability so you have a Single Source of Truth constantly.
                            </p>
                        </motion.div>

                        {/* Pillar 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group p-8 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-cta)] transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-cta)]/10 flex items-center justify-center text-[var(--color-cta)] font-bold font-mono">
                                    03
                                </div>
                                <h3 className="text-xl font-bold">Results (The Engine)</h3>
                            </div>
                            <p className="text-[var(--color-muted)] leading-relaxed">
                                Math-based math is the only validator. We govern through the Revenue Performance Model, ensuring every decision is backed by ground truth.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
