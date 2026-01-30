"use client";

import { motion } from "motion/react";
import content from "@/content/services.json";
import { Container } from "@/components/layout/Container";
import { ArrowDown } from "lucide-react";

export function ServicesHero() {
    const { hero } = content;

    return (
        <section className="pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full opacity-40 select-none pointer-events-none" />

            <Container>
                <div className="text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight"
                    >
                        {hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto"
                    >
                        {hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <a
                            href={hero.cta_url}
                            className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-zinc-200 transition-all"
                        >
                            {hero.cta_text}
                            <ArrowDown className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
