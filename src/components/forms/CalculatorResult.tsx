"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface CalculatorResultProps {
    score: number;
    maxScore: number;
    tier: {
        title: string;
        description: string;
        recommendation: string;
        cta_text: string;
        cta_url: string;
    };
}

export function CalculatorResult({ score, maxScore, tier }: CalculatorResultProps) {
    const percentage = (score / maxScore) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto text-center"
        >
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
                {/* Result Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-display font-bold text-white mb-2">
                        Audit Complete
                    </h2>
                    <p className="text-zinc-400">Here is your Revenue Engine diagnosis.</p>
                </div>

                {/* Score Circle */}
                <div className="flex justify-center mb-8 relative">
                    <div className="w-32 h-32 rounded-full border-4 border-zinc-800 flex items-center justify-center relative">
                        {/* Animated circle stroke would go here with SVG */}
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-white leading-none">
                                {score}
                            </span>
                            <span className="text-xs text-zinc-500 uppercase tracking-widest">
                                / {maxScore}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tier Logic */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-indigo-400 mb-4">{tier.title}</h3>
                    <p className="text-lg text-zinc-300 mb-6">{tier.description}</p>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left mb-6">
                        <h4 className="flex items-center gap-2 font-bold text-white mb-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            Recommendation:
                        </h4>
                        <p className="text-zinc-400 text-sm md:text-base">
                            {tier.recommendation}
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <Link
                    href={tier.cta_url}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105"
                >
                    {tier.cta_text}
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </motion.div>
    );
}
