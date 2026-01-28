"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import content from "@/content/pricing.json";
import { cn } from "@/lib/utils";

export function PricingFAQ() {
    const { faq } = content;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24">
            <Container className="max-w-3xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faq.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-900/50 transition-colors"
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        >
                            <div className="flex justify-between items-center p-6">
                                <h3 className="text-lg font-bold text-zinc-200">{item.question}</h3>
                                {openIndex === idx ? (
                                    <Minus className="w-5 h-5 text-zinc-400" />
                                ) : (
                                    <Plus className="w-5 h-5 text-zinc-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
