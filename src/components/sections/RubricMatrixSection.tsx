"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import content from "@/content/homepage.json";
import { cn } from "@/lib/utils";

interface VitalSignal {
    stage: string;
    signal: string;
    logic: string;
    weight: string;
    color: string;
    border: string;
    bg: string;
}

export function RubricMatrixSection() {
    const { rubric_preview } = content;

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tighter"
                    >
                        {rubric_preview.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-zinc-400"
                    >
                        {rubric_preview.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {rubric_preview.vital_signals.map((item: VitalSignal, idx: number) => (
                        <motion.div
                            key={item.stage}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "group relative p-6 rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1",
                                "hover:border-opacity-50 hover:shadow-2xl hover:shadow-indigo-500/10",
                                item.border
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                            {/* Header: Stage & Weight */}
                            <div className="relative z-10 flex justify-between items-start mb-8">
                                <span className={cn("text-xs font-mono font-bold uppercase tracking-wider", item.color)}>
                                    {item.stage}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500 border border-white/10 px-2 py-1 rounded bg-zinc-950/50">
                                    {item.weight}
                                </span>
                            </div>

                            {/* Signal Name */}
                            <div className="relative z-10 mb-8 min-h-[3rem]">
                                <h3 className="text-xl font-display font-bold text-white leading-tight">
                                    {item.signal}
                                </h3>
                            </div>

                            {/* Logic / Metric (Revealed/Highligted on Hover) */}
                            <div className="relative z-10">
                                <div className="h-px w-full bg-white/5 mb-4 group-hover:bg-white/10 transition-colors" />
                                <p className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                                    <span className="block text-[10px] uppercase text-zinc-600 mb-1">Detection Logic</span>
                                    {item.logic}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="/audit"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors border-b border-zinc-800 hover:border-white pb-0.5"
                    >
                        View Full 40-Point Rubric
                        <span className="text-xs">→</span>
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
