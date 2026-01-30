"use client";

import { motion } from "motion/react";
import content from "@/content/services.json";
import { Container } from "@/components/layout/Container";

export function TimelineSection() {
    const { timeline } = content;

    return (
        <section className="py-20 bg-zinc-900/30">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                        {timeline.title}
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        {timeline.description}
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 hidden md:block" />

                    <div className="grid md:grid-cols-3 gap-8">
                        {timeline.phases.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative z-10"
                            >
                                <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all">
                                    <div className={`absolute top-0 left-0 w-1 h-full bg-${phase.color}-500/50`} />

                                    <div className="mb-4 text-xs font-mono uppercase tracking-widest text-zinc-500">
                                        {phase.weeks}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{phase.phase}</h3>
                                    <p className="text-zinc-400">{phase.focus}</p>
                                </div>
                                {/* Mobile-only connector */}
                                {index < timeline.phases.length - 1 && (
                                    <div className="h-8 w-1 bg-zinc-800 mx-auto md:hidden my-4" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
