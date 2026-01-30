"use client";

import { useForm } from "@tanstack/react-form";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import content from "@/content/calculator.json";

interface Question {
    id: string;
    stage: string;
    question: string;
    options: { label: string; value: number }[];
}

interface CalculatorFormAttributes {
    answers: Record<string, number>;
}

interface CalculatorFormProps {
    onComplete?: (score: number) => void;
}

export function CalculatorForm({ onComplete }: CalculatorFormProps) {
    const router = useRouter();
    const [step, setStep] = useState(0);
    // Double-cast to avoid TS overlap error with JSON imports
    const questions = (content.questions as unknown) as Question[];
    const totalSteps = questions.length;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CalculatorFormAttributes>({
        defaultValues: {
            answers: {},
        },
        onSubmit: async ({ value }: { value: CalculatorFormAttributes }) => {
            setIsSubmitting(true);
            // Calculate score immediately for client-side feedback or send to API
            const numericAnswers = Object.values(value.answers) as number[];
            const score = numericAnswers.reduce((a, b) => a + b, 0);

            // Artificial delay for UX "calculating" feel
            await new Promise(resolve => setTimeout(resolve, 800));

            if (onComplete) {
                onComplete(score);
            } else {
                // Fallback to API if no callback provided
                // Encode score in query param for the results page (or use API)
                // For now, we'll route to a client-side result step or page
                // Implementing API submission as per workflow
                try {
                    const response = await fetch("/api/calculate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ answers: value.answers, score }),
                    });

                    const data = await response.json();
                    if (data.redirectUrl) {
                        router.push(data.redirectUrl);
                    }
                } catch (error) {
                    console.error("Calculation failed", error);
                }
            }
            setIsSubmitting(false);
        },
    });

    const currentQuestion = questions[step];

    const handleNext = async (fieldArgs: any, value: number) => {
        fieldArgs.handleChange(value);
        if (step < totalSteps - 1) {
            // Small delay for UX
            setTimeout(() => setStep(step + 1), 250);
        } else {
            await form.handleSubmit();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-zinc-500">
                    <span>
                        Question {step + 1} / {totalSteps}
                    </span>
                    <span>{currentQuestion.stage} Phase</span>
                </div>
            </div>

            {/* Question Card */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl backdrop-blur-md"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">
                            {currentQuestion.question}
                        </h3>

                        <form.Field
                            name={`answers.${currentQuestion.id}`}
                            children={(field: any) => (
                                <div className="space-y-3">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleNext(field, option.value)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden",
                                                field.state.value === option.value
                                                    ? "bg-indigo-600/10 border-indigo-500 text-white"
                                                    : "bg-zinc-900 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:border-white/10 hover:text-zinc-200"
                                            )}
                                        >
                                            <div className="flex items-center gap-3 relative z-10">
                                                <div
                                                    className={cn(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center",
                                                        field.state.value === option.value
                                                            ? "border-indigo-500 bg-indigo-500"
                                                            : "border-zinc-700 group-hover:border-zinc-500"
                                                    )}
                                                >
                                                    {field.state.value === option.value && (
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-sm md:text-base">
                                                    {option.label}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        />
                    </motion.div>
                </AnimatePresence>
            </form>
        </div>
    );
}
