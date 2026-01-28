'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function CalculatorForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const router = useRouter();

    const questions = [
        {
            id: "awareness",
            stage: "Awareness",
            question: "How predictable is your lead generation?",
            options: [
                { value: 1, label: "Sporadic. We rely on referrals and random activity." },
                { value: 2, label: "Somewhat. We have campaigns but results fluctuate." },
                { value: 3, label: "Predictable. We can forecast lead volume accurately." }
            ]
        },
        {
            id: "consideration",
            stage: "Consideration",
            question: "Do you have a system to nurture leads who aren't ready to buy?",
            options: [
                { value: 1, label: "No. If they don't buy, they disappear." },
                { value: 2, label: "Manual. Sales reps follow up when they remember." },
                { value: 3, label: "Automated. We have a content value ladder in place." }
            ]
        },
        {
            id: "decision",
            stage: "Decision",
            question: "What is your sales conversion rate on qualified leads?",
            options: [
                { value: 1, label: "Unknown or Low (<10%)." },
                { value: 2, label: "Average (15-25%). We win some, lose some." },
                { value: 3, label: "High (30%+). Our offer is a no-brainer." }
            ]
        },
        {
            id: "conversion",
            stage: "Conversion",
            question: "How frictionless is your payment and onboarding process?",
            options: [
                { value: 1, label: "Manual. PDF invoices and manual account setup." },
                { value: 2, label: "Hybrid. Payment is online but onboarding is manual." },
                { value: 3, label: "Seamless. Instant payment and automated access." }
            ]
        },
        {
            id: "retention",
            stage: "Retention",
            question: "Do you have a programmed LTV expansion strategy?",
            options: [
                { value: 1, label: "No. We just try to keep them happy." },
                { value: 2, label: "Reactive. We upsell when clients ask." },
                { value: 3, label: "Proactive. We have a predefined expansion map." }
            ]
        }
    ];

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = value;
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        } else {
            finishQuiz(newAnswers);
        }
    };

    const finishQuiz = (finalAnswers: number[]) => {
        const score = finalAnswers.reduce((a, b) => a + b, 0);
        const params = new URLSearchParams({ score: score.toString() });
        router.push(`/calculator/result?${params.toString()}`);
    };

    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8 h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-[var(--color-primary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 md:p-12 shadow-lg"
                >
                    <div className="text-sm font-bold text-[var(--color-primary)] mb-2 uppercase tracking-wide">
                        Question {currentStep + 1} of {questions.length} • {questions[currentStep].stage}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-8">
                        {questions[currentStep].question}
                    </h2>

                    <div className="space-y-4">
                        {questions[currentStep].options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(option.value)}
                                className="w-full text-left p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/10 transition-all font-medium text-lg"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
