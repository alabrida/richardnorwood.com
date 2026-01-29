"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";
import content from "@/content/homepage.json";

export function SocialProofSection() {
    const { social_proof } = content;

    return (
        <section className="py-24 border-t border-white/5 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <Container>
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-12"
                    >
                        {social_proof.title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {social_proof.metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                                    {metric.value}
                                </div>
                                <div className="text-zinc-500 font-medium uppercase tracking-widest text-sm">
                                    {metric.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Case Studies Section */}
                    <div className="mb-24">
                        <h3 className="text-2xl font-bold text-white mb-8">Recent wins</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* @ts-ignore */}
                            {social_proof.case_studies?.map((study, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="p-6 rounded-xl bg-zinc-900/60 border border-white/5 text-left hover:border-indigo-500/30 transition-colors"
                                >
                                    <div className="text-indigo-400 text-sm font-mono mb-2">{study.client}</div>
                                    <h4 className="text-xl font-bold text-white mb-2">{study.title}</h4>
                                    <div className="text-3xl font-bold text-white mb-3 tracking-tight">{study.result}</div>
                                    <p className="text-zinc-400 text-sm">{study.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {social_proof.testimonials.map((t, index) => (
                            <motion.figure
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 text-left"
                            >
                                <blockquote className="text-xl text-zinc-300 mb-6 leading-relaxed">
                                    "{t.quote}"
                                </blockquote>
                                <figcaption className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                                    <div>
                                        <div className="font-bold text-white">{t.author}</div>
                                        <div className="text-sm text-zinc-500">{t.role}</div>
                                    </div>
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
