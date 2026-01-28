"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import content from "@/content/pricing.json";
import { cn } from "@/lib/utils";

export function PricingGrid() {
    const [isAnnual, setIsAnnual] = useState(true);
    const { pricing } = content;

    return (
        <section className="py-24 relative">
            <Container>
                {/* Toggle */}
                <div className="flex justify-center mb-16">
                    <div className="relative flex items-center p-1 bg-zinc-900 rounded-full border border-zinc-800">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={cn(
                                "relative z-10 px-6 py-2 text-sm font-medium transition-colors rounded-full",
                                !isAnnual ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={cn(
                                "relative z-10 px-6 py-2 text-sm font-medium transition-colors rounded-full",
                                isAnnual ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            Annual <span className="ml-1 text-xs text-emerald-500 font-bold">-20%</span>
                        </button>
                        <div
                            className={cn(
                                "absolute inset-1 w-[calc(50%-4px)] bg-zinc-800 rounded-full transition-all duration-300",
                                isAnnual ? "translate-x-full" : "translate-x-0"
                            )}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pricing.tiers.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col p-6 rounded-2xl border transition-all duration-300",
                                tier.popular
                                    ? "bg-zinc-900/80 border-indigo-500/50 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]"
                                    : "bg-zinc-950/50 border-white/10 hover:border-white/20"
                            )}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-sm text-zinc-400 h-10">{tier.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    {typeof tier.price.monthly === 'number' && typeof tier.price.annual === 'number' ? (
                                        <>
                                            <span className="text-4xl font-display font-bold text-white">
                                                ${isAnnual ? Math.round(tier.price.annual / 12) : tier.price.monthly}
                                            </span>
                                            <span className="text-zinc-500">/mo</span>
                                        </>
                                    ) : (
                                        <span className="text-4xl font-display font-bold text-white">Custom</span>
                                    )}
                                </div>
                                {isAnnual && typeof tier.price.annual === 'number' && tier.price.annual > 0 && (
                                    <p className="text-xs text-zinc-500 mt-1">Billed ${tier.price.annual} yearly</p>
                                )}
                            </div>

                            <Button
                                className={cn(
                                    "w-full mb-8",
                                    tier.popular
                                        ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                                        : "bg-zinc-800 hover:bg-zinc-700 text-white"
                                )}
                            >
                                {tier.cta}
                            </Button>

                            <div className="space-y-4 flex-grow">
                                {tier.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
