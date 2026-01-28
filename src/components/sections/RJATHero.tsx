"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export function RJATHero() {
    return (
        <section className="relative pt-32 pb-16 text-center">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm text-orange-400 backdrop-blur-xl mb-8"
                >
                    <span className="mr-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    AI-Powered Analysis
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mx-auto max-w-4xl text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6"
                >
                    Analyze Your Revenue Engine
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-xl text-zinc-400 leading-relaxed mb-8"
                >
                    Our automated agent scans your public digital footprint to identify leaks, missed opportunities, and architectural flaws in your revenue system.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-6 text-sm text-zinc-500"
                >
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Private & Secure</span>
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Manually Verified</span>
                </motion.div>
            </Container>

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
