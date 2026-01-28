'use client';

import { Container } from '@/components/layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

function ResultContent() {
    const searchParams = useSearchParams();
    const score = parseInt(searchParams.get('score') || '0');

    let result = {
        tier: "Unknown",
        message: "Please complete the assessment.",
        cta: "Take Assessment",
        href: "/calculator",
        color: "var(--color-muted)"
    };

    if (score >= 12) {
        result = {
            tier: "Unified Engine",
            message: "Your revenue engine is performing well. You are ready to scale aggressively.",
            cta: "Book Strategy Call",
            href: "/contact",
            color: "var(--color-success)"
        };
    } else if (score >= 9) {
        result = {
            tier: "Fragmented System",
            message: "You have the pieces, but they aren't connected. You are leaking revenue at key handoffs.",
            cta: "Run Deep Audit (RJAT)",
            href: "/rjat",
            color: "var(--color-warning)"
        };
    } else if (score > 0) {
        result = {
            tier: "Fractured Funnel",
            message: "Your commercial engine is broken. You need to rebuild the foundation before scaling.",
            cta: "View Partnership Program",
            href: "/services",
            color: "var(--color-error)"
        };
    }

    return (
        <Container className="py-20 md:py-32 text-center">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block px-6 py-2 rounded-full border mb-8 text-sm font-bold uppercase tracking-widest"
                    style={{ borderColor: result.color, color: result.color }}
                >
                    Score: {score}/15
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    {result.tier}
                </h1>

                <p className="text-xl md:text-2xl text-[var(--color-muted)] mb-12">
                    {result.message}
                </p>

                <div className="p-8 bg-[var(--color-card)] rounded-[var(--radius-xl)] border border-[var(--color-border)] mb-12">
                    <h3 className="text-lg font-bold mb-4">Recommended Next Step</h3>
                    <Link
                        href={result.href}
                        className="inline-block w-full md:w-auto px-8 py-4 text-lg font-bold text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] rounded-[var(--radius-xl)] transition-colors"
                    >
                        {result.cta}
                    </Link>
                </div>

                <Link href="/calculator" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]">
                    Retake Assessment
                </Link>
            </div>
        </Container>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading result...</div>}>
            <ResultContent />
        </Suspense>
    );
}
