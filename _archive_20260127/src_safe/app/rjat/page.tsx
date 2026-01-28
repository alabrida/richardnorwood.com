'use client';

import { Container } from '@/components/layout';
import { RJATHero } from '@/components/sections/RJATHero';
import { RJATForm } from '@/components/forms/RJATForm';
import { ProcessingState } from '@/components/rjat/ProcessingState';
import { ResultsPreview } from '@/components/rjat/ResultsPreview';
import { PaymentGate } from '@/components/rjat/PaymentGate';
import { useState } from 'react';

type Step = 'input' | 'processing' | 'preview' | 'payment';

export default function RJATPage() {
    const [step, setStep] = useState<Step>('input');

    const handleSubmit = async (data: any) => {
        setStep('processing');
        // Simulate API call and processing time
        await fetch('/api/rjat', { method: 'POST', body: JSON.stringify(data) });

        // Simulate 10s processing time (conceptually 10s, but faster here for demo)
        setTimeout(() => {
            setStep('preview');
        }, 11000); // 11s to allow full animation cycle
    };

    const handleUnlock = () => {
        setStep('payment');
    };

    return (
        <main className="py-20 md:py-32 min-h-screen">
            <Container>
                {step === 'input' && (
                    <>
                        <RJATHero />
                        <RJATForm onSubmit={handleSubmit} isLoading={false} />
                    </>
                )}

                {step === 'processing' && (
                    <ProcessingState />
                )}

                {step === 'preview' && (
                    <ResultsPreview onUnlock={handleUnlock} />
                )}

                {step === 'payment' && (
                    <PaymentGate onUnlock={() => alert('Redirecting to Stripe...')} />
                )}
            </Container>
        </main>
    );
}
