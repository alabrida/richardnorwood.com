'use client';

import { Container } from '@/components/layout';
import content from '@/content/pricing.json';

export function PricingComparison() {
    return (
        <section className="py-24 bg-[var(--color-card)] border-y border-[var(--color-border)]">
            <Container>
                <h2 className="text-3xl font-bold text-center mb-16">{content.comparison.title}</h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-[var(--color-border)]">
                                <th className="text-left py-4 px-6 text-[var(--color-muted)] font-medium">Feature</th>
                                <th className="py-4 px-6 text-center font-bold">Standard</th>
                                <th className="py-4 px-6 text-center font-bold text-[var(--color-primary)]">Pro</th>
                                <th className="py-4 px-6 text-center font-bold">Battleship</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.comparison.features.map((row, index) => (
                                <tr
                                    key={row.name}
                                    className={index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-card)]'}
                                >
                                    <td className="py-4 px-6 font-medium">{row.name}</td>
                                    {['standard', 'pro', 'battleship'].map((plan) => (
                                        <td key={plan} className="py-4 px-6 text-center text-[var(--color-muted)]">
                                            {typeof (row as any)[plan] === 'boolean' ? (
                                                (row as any)[plan] ? (
                                                    <svg className="w-6 h-6 text-[var(--color-success)] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-[var(--color-muted)]/30">—</span>
                                                )
                                            ) : (
                                                (row as any)[plan]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </section>
    );
}
