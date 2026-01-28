"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";

export function BlogHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden text-center">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-xl mb-8"
                >
                    <span className="mr-2 h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                    Engineering & Insights
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mx-auto max-w-4xl text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6"
                >
                    The Architecture Log
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-xl text-zinc-400 leading-relaxed"
                >
                    Technical deep dives, revenue models, and the philosophy behind building scalable engines.
                </motion.p>
            </Container>

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
