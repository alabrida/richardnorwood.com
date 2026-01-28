"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";
import content from "@/content/services.json";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CurriculumSection() {
    const { curriculum } = content;
    const [openWeek, setOpenWeek] = useState<number | null>(null);

    return (
        <section className="py-24 border-t border-white/5 bg-zinc-950/30">
            <Container className="max-w-4xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
                    >
                        The Syllabus
                    </motion.h2>
                    <p className="text-zinc-400">
                        12 Weeks. 12 Systems. Zero Fluff.
                    </p>
                </div>

                <div className="space-y-4">
                    {curriculum.map((week, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                        >
                            <button
                                onClick={() => setOpenWeek(openWeek === index ? null : index)}
                                className="w-full text-left p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition-all flex items-start gap-6 group-focus:ring-1 group-focus:ring-white/20"
                            >
                                <div className="text-zinc-500 font-mono text-sm pt-1 shrink-0">
                                    WEEK {week.week.toString().padStart(2, '0')}
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                        {week.topic}
                                    </h3>
                                    <div
                                        className={cn(
                                            "text-zinc-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out",
                                            openWeek === index ? "max-h-24 opacity-100" : "max-h-0 opacity-0 md:max-h-24 md:opacity-100" // Always show on desktop? No, let's keep consistent. Actually, displaying all descriptions on desktop looks better for scannability.
                                        )}
                                    >
                                        {/* Override: Let's simpler approach. Just show descriptions always on desktop, accordion on mobile? 
                         Or just standard list. The JSON allows for simple list. Let's do standard list for clarity.
                     */}
                                        {week.desc}
                                    </div>
                                </div>

                                {/* Optional: Add icon if we want accordion interaction later. For now, static clean list is better for 12 items. */}
                                {/* <div className="hidden md:block w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-zinc-500" />
                </div> */}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
