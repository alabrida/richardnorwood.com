"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";
import content from "@/content/homepage.json";
import { Eye, MessageSquare, FileCheck, Package, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
    Eye: Eye,
    MessageSquare: MessageSquare,
    FileCheck: FileCheck,
    Package: Package,
    Megaphone: Megaphone,
};

export function IdeologySection() {
    const { ideology } = content;

    return (
        <section className="py-24 md:py-32 border-t border-white/5 bg-zinc-950/50 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <Container className="relative z-10">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6"
                    >
                        {ideology.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto"
                    >
                        {ideology.description}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) - Base Layer */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />

                    {/* Harmonic Wave (Desktop) - Moving Gradient */}
                    <motion.div
                        className="hidden md:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -translate-y-1/2 z-0 w-1/3 blur-xl"
                        animate={{
                            left: ["-30%", "130%"],
                        }}
                        transition={{
                            duration: 4, // Slower, more fluid
                            repeat: Infinity,
                            ease: "easeInOut", // Smooth ease in/out for harmonic feel
                            repeatDelay: 0
                        }}
                    />

                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 relative z-10 justify-between">
                        {ideology.stages.map((stage, index) => {
                            const Icon = icons[stage.icon as keyof typeof icons] || Eye;
                            // Define CSS variables for this specific stage
                            const style = {
                                '--stage-color': stage.color,
                                '--stage-color-20': `${stage.color}20`,
                                '--stage-color-40': `${stage.color}40`,
                            } as React.CSSProperties;

                            return (
                                <div key={stage.id} className="contents md:flex md:items-center md:flex-1">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }} // Sequential entry
                                        className="group relative flex-1 h-full"
                                    >
                                        {/* Card Container */}
                                        <div
                                            className="h-full p-6 bg-zinc-900 border border-white/10 rounded-2xl transition-all duration-500 hover:border-[var(--stage-color-40)] hover:shadow-[0_0_30px_-10px_var(--stage-color-40)] relative overflow-hidden flex flex-col"
                                            style={style}
                                        >
                                            {/* Harmonic Wave Overlay - Synchronized with the beam */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-[var(--stage-color)]/20 to-transparent opacity-0 mix-blend-soft-light"
                                                animate={{
                                                    opacity: [0, 0.4, 0] // Gentle swell
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: (index * 0.5) + 0.5, // Tightly synchronized delay
                                                    repeatDelay: 0
                                                }}
                                            />

                                            {/* Glow Effect */}
                                            <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[var(--stage-color)]" />

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left h-full flex-grow">

                                                {/* Icon & Number Row */}
                                                <div className="w-full flex justify-between items-start mb-6">
                                                    <div className="p-3 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:text-[var(--stage-color)] group-hover:bg-[var(--stage-color-20)] transition-all duration-300 mb-4 md:mb-0">
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="text-5xl font-bold text-zinc-800 font-display select-none group-hover:text-white/10 transition-colors">
                                                        0{stage.id}
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--stage-color)] transition-colors">
                                                    {stage.title}
                                                </h3>

                                                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors flex-grow">
                                                    {stage.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Mobile Connector (Vertical) */}
                                        {index !== ideology.stages.length - 1 && (
                                            <div className="md:hidden absolute left-1/2 bottom-0 w-0.5 h-6 bg-zinc-800 translate-y-full -translate-x-1/2 flex items-end justify-center overflow-visible">
                                                <div className="w-2 h-2 border-b border-r border-zinc-600 rotate-45 mb-1" />
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Desktop Arrow Connector */}
                                    {index !== ideology.stages.length - 1 && (
                                        <div className="hidden md:flex items-center justify-center px-2 text-zinc-800 relative z-20">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 opacity-50">
                                                <path d="M13 17l5-5-5-5" />
                                                <path d="M6 17l5-5-5-5" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}

