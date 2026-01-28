'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ProcessingState() {
    const steps = [
        "Initializing Agents...",
        "Scanning Website Structure...",
        "Analyzing Traffic Sources...",
        "Detecting Revenue Leaks...",
        "Generating Report..."
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-md mx-auto text-center py-12">
            <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-[var(--color-primary)]/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-[var(--color-primary)] rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center font-bold text-[var(--color-primary)]">
                    AI
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Deep Scan in Progress</h2>

            <div className="h-2 bg-[var(--color-border)] rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-[var(--color-primary)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="space-y-2">
                {steps.map((step, index) => (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: index === currentStep ? 1 : index < currentStep ? 0.5 : 0.2,
                            x: 0,
                            scale: index === currentStep ? 1.05 : 1
                        }}
                        className={`text-sm ${index === currentStep ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-muted)]'}`}
                    >
                        {index < currentStep && "✓ "}{step}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
