"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import content from "@/content/services.json";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function ServicesHero() {
    const { hero } = content;

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Spotlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />

            <Container className="text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-indigo-400 backdrop-blur-xl"
                >
                    Limited Availability: Q1 2026
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="max-w-4xl text-5xl md:text-7xl font-display font-bold tracking-tighter text-white mb-8"
                >
                    {hero.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-xl text-zinc-400 mb-10 leading-relaxed"
                >
                    {hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <Link href={hero.cta_href}>
                        <Button size="lg" className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-zinc-200 gap-2">
                            {hero.cta_text} <ArrowDown className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
