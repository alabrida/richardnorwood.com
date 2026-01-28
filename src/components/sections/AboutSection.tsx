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
                        <Link href={about.cta_url}>
                            <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-zinc-200">
                                {about.cta_text}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
