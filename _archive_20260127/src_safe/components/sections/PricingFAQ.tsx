'use client';

import { Container } from '@/components/layout';
import content from '@/content/pricing.json';

export function PricingFAQ() {
    return (
        <section className="py-24">
            <Container>
                <h2 className="text-3xl font-bold text-center mb-16">{content.faq.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {content.faq.items.map((item) => (
                        <div key={item.question} className="p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)]">
                            <h3 className="text-lg font-bold mb-3">{item.question}</h3>
                            <p className="text-[var(--color-muted)]">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
