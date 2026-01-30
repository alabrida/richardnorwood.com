"use client";

import { motion } from "motion/react";
import content from "@/content/services.json";
import { Container } from "@/components/layout/Container";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceTiers() {
    const { tiers } = content;

    return (
        <section id="apply" className="py-20 relative">
            <Container>
                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative p-8 rounded-3xl border flex flex-col h-full",
                                tier.recommended
                                    ? "bg-zinc-900 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10"
                                    : "bg-black/50 border-white/10"
                            )}
                        >
                            {tier.recommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                                <p className="text-sm text-zinc-500 font-mono uppercase tracking-wide mb-6">{tier.subtitle}</p>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    <span className="text-zinc-500">{tier.period}</span>
                                </div>
                                <p className="text-zinc-400 mt-4 leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={tier.cta_url}
                                className={cn(
                                    "w-full py-3 rounded-xl font-bold text-center transition-all",
                                    tier.recommended
                                        ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                )}
                            >
                                {tier.cta_text}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
