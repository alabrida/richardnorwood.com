"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";
import content from "@/content/homepage.json";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function SocialProofSection() {
    const { social_proof } = content;

    return (
        <section className="py-24 border-t border-white/5 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <Container>
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6"
                    >
                        {social_proof.title}
                    </motion.h2>
                </div>

                {/* Custom Grid Layout: 3 Columns. Metrics Top. Testimonials Flank. Case Studies Center. */}
                <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[12rem]">

                    {/* --- Row 1: Metrics (Compact) --- */}
                    {social_proof.metrics.map((metric, i) => (
                        <BentoGridItem
                            key={`metric-${i}`}
                            className="bg-zinc-900/40 border-white/10 md:col-span-1 p-4 flex flex-col justify-center min-h-[8rem] text-center"
                            header={
                                <div className="text-4xl font-bold text-white tracking-tighter group-hover/bento:text-indigo-400 transition-colors mb-2">
                                    {metric.value}
                                </div>
                            }
                            title={<span className="text-sm font-medium uppercase tracking-widest text-zinc-500">{metric.label}</span>}
                            // @ts-ignore
                            description={<p className="text-sm text-zinc-400 mt-2 leading-relaxed">"{metric.description}"</p>}
                        />
                    ))}

                    {/* --- Row 2 & 3: Main Body --- */}

                    {/* Left Pillar: Testimonial 1 */}
                    <BentoGridItem
                        className="bg-zinc-900/40 border-white/10 md:col-span-1 md:row-span-2 flex flex-col justify-between"
                        header={<div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4" />}
                        title={social_proof.testimonials[0].author}
                        description={
                            <div className="mt-2">
                                <p className="text-zinc-300 italic mb-4 leading-relaxed">"{social_proof.testimonials[0].quote}"</p>
                                <span className="text-xs text-zinc-500">{social_proof.testimonials[0].role}</span>
                            </div>
                        }
                    />

                    {/* Center Stack: Case Studies */}
                    {/* Case Study 1 */}
                    {/* @ts-ignore */}
                    <BentoGridItem
                        className="bg-zinc-900/40 border-white/10 md:col-span-1 md:row-span-1 text-center"
                        title={social_proof.case_studies[0].title}
                        description={
                            <span>
                                <span className="block text-indigo-400 font-mono text-xs mb-1">{social_proof.case_studies[0].client}</span>
                                {social_proof.case_studies[0].description}
                            </span>
                        }
                        header={<div className="w-full h-20 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 mx-auto" />}
                    />

                    {/* Right Pillar: Testimonial 2 */}
                    <BentoGridItem
                        className="bg-zinc-900/40 border-white/10 md:col-span-1 md:row-span-2 flex flex-col justify-between"
                        header={<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4" />}
                        title={social_proof.testimonials[1].author}
                        description={
                            <div className="mt-2">
                                <p className="text-zinc-300 italic mb-4 leading-relaxed">"{social_proof.testimonials[1].quote}"</p>
                                <span className="text-xs text-zinc-500">{social_proof.testimonials[1].role}</span>
                            </div>
                        }
                    />

                    {/* Center Stack: Case Study 2 (Fills the gap under CS1) */}
                    {/* Note: In a dense grid, this needs to be placed after the right pillar in code order if using dense, 
                        BUT standard CSS grid auto-placement fills row by row. 
                        We need: T1(R2-3), CS1(R2), T2(R2-3), CS2(R3).
                        CSS Grid order: T1, CS1, T2, CS2. 
                        Since T1 and T2 are row-span-2, CS2 should naturally flow into Col 2 Row 3.
                    */}

                    {/* @ts-ignore */}
                    <BentoGridItem
                        className="bg-zinc-900/40 border-white/10 md:col-span-1 md:row-span-1 text-center"
                        title={social_proof.case_studies[1].title}
                        description={
                            <span>
                                <span className="block text-indigo-400 font-mono text-xs mb-1">{social_proof.case_studies[1].client}</span>
                                {social_proof.case_studies[1].description}
                            </span>
                        }
                        header={<div className="w-full h-20 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/5 mx-auto" />}
                    />

                </BentoGrid>
            </Container>
        </section>
    );
}
