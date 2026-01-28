"use client";

import { motion } from "motion/react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface ProcessingStateProps {
    progress: number;
    stage: string; // "scanning_site" | "checking_social" | "analyzing_metrics"
}

export function ProcessingState({ progress, stage }: ProcessingStateProps) {
    const steps = [
        { id: "scanning_site", label: "Crawling Website Structure" },
        { id: "checking_social", label: "Analyzing Social Signals" },
        { id: "analyzing_metrics", label: "Computing Revenue Score" },
    ];

    return (
        <div className="w-full max-w-xl mx-auto text-center py-12">
            <div className="mb-8 relative">
                <svg className="w-32 h-32 mx-auto transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="#27272a" strokeWidth="8" fill="transparent" />
                    <motion.circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="#f97316"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="377"
                        strokeDashoffset={377 - (377 * progress) / 100}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-3xl font-bold text-white">{Math.round(progress)}%</span>
                </div>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
                {steps.map((step, index) => {
                    const isCompleted = progress > ((index + 1) * 33);
                    const isActive = !isCompleted && progress > (index * 33);

                    return (
                        <div key={step.id} className="flex items-center gap-3 text-left">
                            <div className="w-6 flex justify-center">
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : isActive ? (
                                    <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                )}
                            </div>
                            <span className={isCompleted || isActive ? "text-white font-medium" : "text-zinc-600"}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            <p className="mt-12 text-zinc-500 text-sm animate-pulse">
                Do not close this window. Analysis in progress...
            </p>
        </div>
    );
}
