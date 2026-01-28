'use client';

import { Container } from '@/components/layout';
import { motion } from 'framer-motion';
import content from '@/content/homepage.json';

export function IdeologySection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {content.ideology.title}
                    </h2>
                    <p className="text-xl text-[var(--color-muted)]">
                        {content.ideology.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                    {content.ideology.stages.map((stage, i) => {
                        // Determine column span logic based on index or stage ID if needed, 
                        // but for dynamic usage we might need to recreate the grid logic or add it to JSON.
                        // The JSON didn't have colSpan. Let's infer it or just default to 1 for now to prevent errors,
                        // or re-add the colSpan logic based on ID matching if we want to preserve the bento layout.
                        // Looking at original code: 
                        // Awareness: col-span-2
                        // Consideration: col-span-1
                        // Decision: col-span-1
                        // Conversion: col-span-2
                        // Retention: col-span-3

                        let colSpan = "col-span-1";
                        if (stage.id === 'awareness') colSpan = "col-span-1 md:col-span-2";
                        if (stage.id === 'conversion') colSpan = "col-span-1 md:col-span-2";
                        if (stage.id === 'retention') colSpan = "col-span-1 md:col-span-3";

                        return (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`${colSpan} group relative p-8 rounded-[var(--radius-2xl)] glass hover:border-[var(--color-primary)] transition-all duration-300 overflow-hidden`}
                            >
                                {/* Glow Effect */}
                                <div
                                    className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-primary)]/20 transition-all duration-500"
                                    style={{ backgroundColor: `${stage.color}20` }}
                                />

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div
                                            className="w-3 h-3 rounded-full mb-6"
                                            style={{ backgroundColor: stage.color, boxShadow: `0 0 10px ${stage.color}` }}
                                        />
                                        <h3 className="text-2xl font-bold mb-3">{stage.title}</h3>
                                        <p className="text-[var(--color-muted)] text-lg leading-relaxed">
                                            {stage.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                        <span className="text-sm font-bold tracking-widest uppercase" style={{ color: stage.color }}>
                                            Inspect Vital →
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
