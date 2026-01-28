'use client';

import { Container } from '@/components/layout';
import { CalculatorForm } from '@/components/forms/CalculatorForm';

export default function CalculatorPage() {
    return (
        <main className="py-20 md:py-32">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                        Audit Your Revenue Engine
                    </h1>
                    <p className="text-xl text-[var(--color-muted)] mb-8">
                        Answer 5 questions to diagnose where your commercial machine is leaking revenue.
                        You'll get an immediate score and a tailored action plan.
                    </p>
                    <div className="flex justify-center gap-8 text-sm text-[var(--color-muted)]">
                        <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mr-2" />
                            2 Minutes
                        </div>
                        <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mr-2" />
                            Free Analysis
                        </div>
                        <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mr-2" />
                            No Email Required
                        </div>
                    </div>
                </div>

                <CalculatorForm />
            </Container>
        </main>
    );
}
