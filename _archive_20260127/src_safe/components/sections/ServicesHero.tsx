'use client';

import { Container } from '@/components/layout';
import content from '@/content/services.json';
import Link from 'next/link';

export function ServicesHero() {
    return (
        <section className="py-20 md:py-32 text-center bg-[var(--color-background)]">
            <Container>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                    {content.hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-[var(--color-muted)] mb-10 max-w-3xl mx-auto">
                    {content.hero.subhead}
                </p>
                <Link
                    href="#tiers"
                    className="inline-block px-8 py-4 text-lg font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-xl)] transition-colors"
                >
                    {content.hero.cta}
                </Link>
            </Container>
        </section>
    );
}
