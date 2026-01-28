"use client";

import { Container } from "@/components/layout/Container";
import { Check, X, Minus } from "lucide-react";
import content from "@/content/pricing.json";
import { cn } from "@/lib/utils";

export function ComparisonTable() {
    const { comparison, pricing } = content;

    return (
        <section className="py-20 bg-zinc-950/30 border-y border-white/5">
            <Container>
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Detailed Comparison</h2>
                    <p className="text-zinc-400">Compare features deeply before you decide.</p>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Header */}
                        <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 text-sm font-bold text-zinc-400 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10">
                            <div className="pl-4">Feature</div>
                            {pricing.tiers.map(tier => (
                                <div key={tier.id} className="text-center">{tier.name}</div>
                            ))}
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-white/5">
                            {comparison.features.map((feature, idx) => (
                                <div key={idx} className="grid grid-cols-5 gap-4 p-4 text-sm hover:bg-white/5 transition-colors">
                                    <div className="pl-4 font-medium text-zinc-200 flex items-center">{feature.name}</div>
                                    {pricing.tiers.map(tier => {
                                        const value = feature.tiers[tier.id as keyof typeof feature.tiers];
                                        return (
                                            <div key={tier.id} className="flex justify-center items-center text-zinc-400">
                                                {value === true ? (
                                                    <Check className="w-5 h-5 text-emerald-500" />
                                                ) : value === false ? (
                                                    <Minus className="w-5 h-5 text-zinc-700" />
                                                ) : (
                                                    <span className="text-white font-medium">{value}</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
