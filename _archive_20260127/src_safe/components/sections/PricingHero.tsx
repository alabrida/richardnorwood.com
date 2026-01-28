'use client';

import { Container } from '@/components/layout';
import content from '@/content/pricing.json';

export function PricingHero() {
    return (
        <section className="py-20 text-center bg-[var(--color-background)]">
            <Container>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                    {content.hero.title}
                </h1>
                <p className="text-xl text-[var(--color-muted)] mb-12 max-w-2xl mx-auto">
                    {content.hero.subhead}
                </p>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {content.tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`p-8 rounded-[var(--radius-xl)] border transition-all hover:shadow-lg ${tier.highlight
                                    ? 'border-[var(--color-primary)] bg-[var(--color-card)] relative overflow-hidden'
                                    : 'border-[var(--color-border)] bg-[var(--color-background)]'
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-[var(--color-primary)]" />
                            )}

                            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold text-gradient">{tier.price}</span>
                                <span className="text-[var(--color-muted)] ml-1">{tier.period}</span>
                            </div>
                            <p className="text-[var(--color-muted)] mb-6 min-h-[3rem]">{tier.description}</p>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start text-sm">
                                        <svg className="w-5 h-5 text-[var(--color-success)] mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={tier.href}
                                className={`block w-full text-center py-3 rounded-[var(--radius-lg)] font-bold transition-colors ${tier.highlight
                                        ? 'bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white shadow-lg shadow-[rgba(255,102,0,0.2)]'
                                        : 'bg-[var(--color-muted)]/10 hover:bg-[var(--color-muted)]/20 text-[var(--color-foreground)]'
                                    }`}
                            >
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
