"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import content from "@/content/services.json";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ServiceTiers() {
    const { tiers } = content;

    return (
        <section id="tiers" className="py-24 border-t border-white/5 bg-zinc-950/50">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => {
                        const isPopular = tier.popular;

                        return (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className={cn(
                                    "relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300",
                                    isPopular
                                        ? "bg-zinc-900/60 border-indigo-500/50 shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]"
                                        : "bg-zinc-900/20 border-white/10 hover:border-white/20 hover:bg-zinc-900/40"
                                )}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-indigo-400">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                    <div className="text-4xl font-display font-bold text-white mb-4">{tier.price}</div>
                                    <p className="text-zinc-400 text-sm leading-relaxed min-h-[60px]">
                                        {tier.description}
                                    </p>
                                </div>

                                <ul className="flex-grow space-y-4 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                                            <Check className={cn("w-5 h-5 shrink-0", isPopular ? "text-indigo-400" : "text-zinc-600")} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="w-full">
                                    <Button
                                        size="lg"
                                        variant={isPopular ? "default" : "outline"}
                                        className={cn(
                                            "w-full rounded-xl py-6 text-sm font-semibold",
                                            isPopular ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "border-zinc-700 hover:bg-zinc-800 text-white"
                                        )}
                                    >
                                        {tier.cta}
                                    </Button>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
