"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import content from "@/content/homepage.json";

export function AboutSection() {
    const { about } = content;

    return (
        <section className="py-24 border-t border-white/5 bg-zinc-900/30">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Image Placeholder - In real world use next/image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-800">
                            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 flex items-center justify-center text-zinc-600 font-display font-bold text-4xl">
                                RN
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-display font-bold text-white mb-6">
                            {about.title}
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                            {about.bio}
                        </p>

                        {/* Trust Badges - Moved above CTA for reduced friction */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/5 py-8 my-8">
                            {about.badges.map((badge) => (
                                <div key={badge.id} className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-lg bg-zinc-800/50 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                        {/* Dynamic Icon Mapping would go here, simplified for now since we know the icons */}
                                        {badge.icon === "GraduationCap" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>}
                                        {badge.icon === "Award" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>}
                                        {badge.icon === "BarChart3" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white text-sm">{badge.label}</div>
                                        <div className="text-xs text-zinc-500">{badge.issuer}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link href={about.cta_url}>
                                <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-zinc-200 w-full sm:w-auto">
                                    {about.cta_text}
                                </Button>
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
