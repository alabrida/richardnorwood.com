'use client';

import { Container } from '@/components/layout';
import content from '@/content/services.json';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CurriculumSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-[var(--color-card)] border-t border-[var(--color-border)]">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">{content.curriculum.title}</h2>
                        <p className="text-[var(--color-muted)] text-lg mb-8">
                            {content.curriculum.description}
                        </p>
                        <div className="bg-[var(--color-background)] p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)]">
                            <h3 className="text-xl font-bold mb-4">Why This Curriculum?</h3>
                            <p className="text-[var(--color-muted)]">
                                Most courses give you theory. We give you installation. Each week is designed to ship a specific component of your engine, not just learn about it. By Week 12, you don't just have notes—you have a machine.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {content.curriculum.modules.map((module, index) => (
                            <div
                                key={module.week}
                                className="border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-background)] overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] inset-2"
                                >
                                    <div>
                                        <span className="text-sm font-bold text-[var(--color-primary)] block mb-1">
                                            {module.week}
                                        </span>
                                        <span className="text-lg font-bold">{module.topic}</span>
                                    </div>
                                    <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                                        <svg className="w-5 h-5 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-[var(--color-muted)]">
                                                {module.description}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
