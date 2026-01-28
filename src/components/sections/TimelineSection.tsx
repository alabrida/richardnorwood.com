"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";
import content from "@/content/services.json";

export function TimelineSection() {
    const { timeline } = content;

    return (
        <section className="py-24 border-t border-white/5 relative bg-black">
            <Container>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-display font-bold text-center text-white mb-20"
                >
                    {timeline.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative px-4">
                    {/* Desktop Connector Line */}
                    <div className="hidden md:block absolute top-[28px] left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent -z-10" />

                    {timeline.phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-white font-bold text-xl mb-6 relative z-10 shadow-[0_0_0_8px_black]">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{phase.name}</h3>
                            <div className="text-sm font-mono text-indigo-400 mb-4 bg-indigo-500/10 px-2 py-1 rounded">{phase.duration}</div>
                            <p className="text-zinc-400 leading-relaxed text-sm">
                                {phase.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
