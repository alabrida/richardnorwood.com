'use client';

import { Container } from '@/components/layout';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe } from '@/components/ui/Globe';
import { useRef } from 'react';
import content from '@/content/homepage.json';

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);

    // Track scroll within the Hero Section
    const { scrollY } = useScroll();

    // Animations based on scrollY pixels
    const globeY = useTransform(scrollY, [0, 600], [0, 300]); // Descend 300px
    const globeScale = useTransform(scrollY, [0, 600], [1.1, 0.6]); // Shrink slightly less
    const globeOpacity = useTransform(scrollY, [0, 600], [1, 0]); // Start fully visible, fade out

    return (
        <section ref={containerRef} className="relative min-h-[110vh] flex flex-col items-center overflow-hidden">
            {/* Abstract Background - Fixed (Backlight) */}
            <div className="absolute inset-0 z-0 bg-[var(--color-background)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_var(--color-primary)_0%,_transparent_60%)] opacity-30" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
            </div>

            {/* 3D Globe - Scroll Linked */}
            <motion.div
                style={{
                    y: globeY,
                    scale: globeScale,
                    opacity: globeOpacity
                }}
                className="fixed top-[120px] left-1/2 -translate-x-1/2 w-full z-0 flex items-center justify-center pointer-events-none origin-top"
            >
                <div className="relative">
                    <Globe className="w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]" />
                    {/* Tinted Blur Overlay over the sphere */}
                    <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/5 backdrop-blur-[1px]" />
                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_transparent_40%,_var(--color-background)_100%)] opacity-50" />
                </div>
            </motion.div>

            {/* Content */}
            <Container className="relative z-10 text-center pt-16 pb-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold mb-8 backdrop-blur-sm">
                        {content.hero.badge}
                    </div>

                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-none text-shadow-glow"
                        dangerouslySetInnerHTML={{ __html: content.hero.headline }}
                    />

                    <p
                        className="text-lg md:text-xl text-[var(--color-muted)] max-w-6xl mx-auto mb-12 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: content.hero.subhead }}
                    />

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link
                            href={content.hero.primaryCta.href}
                            className="group relative px-8 py-4 bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white text-lg font-bold rounded-full transition-all shadow-[0_0_40px_-10px_var(--color-cta)] hover:shadow-[0_0_60px_-15px_var(--color-cta)] hover:-translate-y-1"
                        >
                            {content.hero.primaryCta.text}
                            <span className="absolute inset-0 rounded-full border border-white/20" />
                        </Link>

                        <Link
                            href={content.hero.secondaryCta.href}
                            className="px-8 py-4 text-[var(--color-foreground)] hover:text-[var(--color-primary)] font-bold transition-colors flex items-center gap-2"
                        >
                            {content.hero.secondaryCta.text}
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </motion.div>
            </Container>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-muted)]/50"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-[var(--color-muted)]/50 to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
}
