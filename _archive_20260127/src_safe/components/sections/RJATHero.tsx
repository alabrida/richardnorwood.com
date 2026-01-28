'use client';

import { Container } from '@/components/layout';

export function RJATHero() {
    return (
        <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                Analyze Your Revenue Engine
            </h1>
            <p className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-8">
                Our AI agents will scan your public footprint to detect leaks.
                Enter your URL to begin the deep audit.
            </p>

            <div className="flex justify-center gap-6 text-sm text-[var(--color-muted)]">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    256-bit Secure
                </div>
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI-Powered
                </div>
            </div>
        </section>
    );
}
