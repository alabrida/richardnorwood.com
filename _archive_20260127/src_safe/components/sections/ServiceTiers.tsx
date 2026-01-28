'use client';

import { Container } from '@/components/layout';
import content from '@/content/services.json';
import { motion } from 'framer-motion';
import { LiquidTiltCard } from '@/components/ui/LiquidTiltCard';
import Link from 'next/link';

export function ServiceTiers() {
    return (
        <section id="tiers" className="py-24 bg-[var(--color-background)] border-y border-[var(--color-border)]">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.tiers.map((tier: any, index) => (
                        <LiquidTiltCard
                            key={tier.name}
                            neonColor={tier.color || 'var(--color-primary)'}
                            className={`flex flex-col ${tier.recommended ? 'shadow-glow' : ''}`}
                        >
                            <div className="p-8 h-full flex flex-col relative">
                                {tier.recommended && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg z-20">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2" style={{ color: tier.color }}>{tier.name}</h3>
                                <div className="text-3xl font-bold text-gradient mb-4">{tier.price}</div>
                                <p className="text-[var(--color-muted)] mb-6 min-h-[3rem]">{tier.description}</p>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.features.map((feature: string) => (
                                        <li key={feature} className="flex items-start">
                                            <svg className="w-5 h-5 text-[var(--color-success)] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm text-[var(--color-foreground)]">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/contact"
                                    className={`block w-full text-center py-3 rounded-[var(--radius-lg)] font-medium transition-all ${tier.recommended
                                        ? 'bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white hover:scale-105'
                                        : 'bg-[var(--color-muted)]/10 hover:bg-[var(--color-muted)]/20 text-[var(--color-foreground)]'
                                        }`}
                                >
                                    {tier.cta}
                                </Link>
                            </div>
                        </LiquidTiltCard>
                    ))}
                </div>
            </Container>
        </section>
    );
}
