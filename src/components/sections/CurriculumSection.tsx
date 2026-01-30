"use client";

import { motion } from "motion/react";
import content from "@/content/services.json";
import { Container } from "@/components/layout/Container";
import { Plus } from "lucide-react";
import * as React from "react";

// Simple Accordion Component since I'm strict on dependencies, but I can assume Radix is around or just build custom.
// I'll build a custom simple one for speed and control.

function AccordionItem({ week, title, description }: { week: string, title: string, description: string }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <div className="flex items-center gap-4 md:gap-8">
                    <span className="text-xs md:text-sm font-mono text-zinc-500 w-16 md:w-20 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                        {week}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {title}
                    </span>
                </div>
                <div className={`p-2 rounded-full border border-white/10 transition-all ${isOpen ? "rotate-45 bg-white text-black" : "text-zinc-500 bg-transparent"}`}>
                    <Plus className="w-4 h-4" />
                </div>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="pb-6 pl-20 md:pl-28 text-zinc-400 leading-relaxed max-w-3xl">
                    {description}
                </div>
            </motion.div>
        </div>
    );
}

export function CurriculumSection() {
    const { curriculum } = content;

    return (
        <section className="py-32">
            <Container>
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                        The Curriculum
                    </h2>
                    <p className="text-zinc-400">
                        Everything you need to know. Week by week.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto border-t border-white/10">
                    {curriculum.map((item, index) => (
                        <AccordionItem
                            key={index}
                            week={item.week}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
