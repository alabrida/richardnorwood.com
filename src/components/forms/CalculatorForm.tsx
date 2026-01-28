"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, BarChart } from "lucide-react";
import content from "@/content/calculator.json";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CalculatorForm() {
    const { questions, results } = content;
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResult, setShowResult] = useState(false);

    const totalSteps = questions.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleSelect = (value: number) => {
        setAnswers(prev => ({ ...prev, [questions[currentStep].id]: value }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const calculateResult = () => {
        const score = Object.values(answers).reduce((a, b) => a + b, 0);
        if (score <= results.fractured.max) return results.fractured;
        if (score <= results.fragmented.max) return results.fragmented;
        return results.unified;
    };

    if (showResult) {
        const result = calculateResult();
        const score = Object.values(answers).reduce((a, b) => a + b, 0);

        return (
            <div className="max-w-2xl mx-auto bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <BarChart className="w-10 h-10 text-emerald-500" />
                    </div>

                    <h2 className="text-3xl font-display font-bold text-white mb-2">{result.title}</h2>
                    <p className="text-emerald-400 font-mono text-sm mb-6">AUDIT SCORE: {score}/15</p>

                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        {result.description}
                    </p>

                    <div className="bg-zinc-950/50 rounded-xl p-6 mb-8 border border-white/5">
                        <div className="flex items-start gap-3 text-left">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-white mb-1">Recommendation</h4>
                                <p className="text-sm text-zinc-400">{result.recommendation}</p>
                            </div>
                        </div>
                    </div>

                    <Link href={result.link}>
                        <Button className="w-full py-6 text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
                            {result.cta} <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>

                    <button
                        onClick={() => {
                            setShowResult(false);
                            setCurrentStep(0);
                            setAnswers({});
                        }}
                        className="mt-6 text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                        Retake Audit
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];
    const canContinue = answers[currentQuestion.id] !== undefined;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs text-zinc-500 mb-2 uppercase tracking-widest font-medium">
                    <span>Question {currentStep + 1} of {totalSteps}</span>
                    <span>{currentQuestion.stage}</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm min-h-[400px] flex flex-col"
                >
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
                        {currentQuestion.text}
                    </h2>

                    <div className="space-y-3 flex-grow">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group",
                                    answers[currentQuestion.id] === option.value
                                        ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                                        : "bg-zinc-950/30 border-white/5 text-zinc-400 hover:bg-zinc-900 hover:border-white/10 hover:text-zinc-200"
                                )}
                            >
                                <span className="text-base">{option.label}</span>
                                {answers[currentQuestion.id] === option.value && (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={cn(
                                "text-zinc-500 hover:text-white hover:bg-transparent pl-0",
                                currentStep === 0 && "opacity-0 pointer-events-none"
                            )}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!canContinue}
                            className={cn(
                                "bg-white text-black hover:bg-zinc-200 transition-all px-8",
                                !canContinue && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            {currentStep === totalSteps - 1 ? "Calculate Score" : "Next Question"}
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
