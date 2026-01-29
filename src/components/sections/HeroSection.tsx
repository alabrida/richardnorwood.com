"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import content from "@/content/homepage.json";
import { KineticTypography } from "@/components/ui/KineticTypography";

export function HeroSection() {
    const { hero } = content;

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]pointer-events-none" />

            <Container className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-xl"
                >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                    Accepting New Architectures
                </motion.div>

                <div className="mb-8">
                    <KineticTypography
                        text={hero.headline}
                        className="max-w-5xl text-5xl md:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 text-center"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
                >
                    {hero.subhead}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <Link href={hero.cta_url}>
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                            {hero.cta_text}
                        </Button>
                    </Link>
                    <Link href="/services">
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-transparent">
                            View Methodologies
                        </Button>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
