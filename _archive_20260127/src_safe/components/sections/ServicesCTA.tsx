'use client';

import { Container } from '@/components/layout';
import content from '@/content/services.json';
import Link from 'next/link';

export function ServicesCTA() {
    return (
        <section className="py-24 bg-[var(--color-card)] text-center">
            <Container>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Ready to Build Your Engine?
                </h2>
                <p className="text-xl text-[var(--color-muted)] mb-10 max-w-2xl mx-auto">
                    Spots are limited. Apply now to see if your business qualifies for the 90-Day Partnership.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="px-8 py-4 text-lg font-bold text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] rounded-[var(--radius-xl)] transition-transform hover:scale-105"
                    >
                        Apply Now
                    </Link>
                    <Link
                        href="/calculator"
                        className="px-8 py-4 text-lg font-medium text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-[var(--color-primary)] rounded-[var(--radius-xl)] transition-colors"
                    >
                        Take the Quiz First
                    </Link>
                </div>
            </Container>
        </section>
    );
}
