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
                                    <div className="group/card relative h-full perspective-1000">
                                        <motion.div
                                            className="relative h-full w-full transition-all duration-500 transform-style-3d group-hover/card:rotate-y-180"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 }}
                                        >
                                            {/* FRONT FACE */}
                                            <div
                                                className="h-full p-6 bg-zinc-900 border border-white/10 rounded-2xl relative overflow-hidden flex flex-col backface-hidden"
                                                style={style}
                                            >
                                                {/* Harmonic Wave Overlay */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-br from-[var(--stage-color)]/20 to-transparent opacity-0 mix-blend-soft-light"
                                                    animate={{ opacity: [0, 0.4, 0] }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: (index * 0.5) + 0.5,
                                                        repeatDelay: 0
                                                    }}
                                                />

                                                {/* Glow Effect */}
                                                <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-500 bg-[var(--stage-color)]" />

                                                {/* Content */}
                                                <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left h-full flex-grow">
                                                    <div className="w-full flex justify-between items-start mb-6">
                                                        <div className="p-3 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover/card:text-[var(--stage-color)] group-hover/card:bg-[var(--stage-color-20)] transition-all duration-300 mb-4 md:mb-0">
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                        <div className="text-5xl font-bold text-zinc-800 font-display select-none group-hover/card:text-white/10 transition-colors">
                                                            0{stage.id}
                                                        </div>
                                                    </div>

                                                    <h3 className="text-lg font-bold text-white mb-3 group-hover/card:text-[var(--stage-color)] transition-colors">
                                                        {stage.title}
                                                    </h3>

                                                    <p className="text-sm text-zinc-500 leading-relaxed group-hover/card:text-zinc-300 transition-colors flex-grow">
                                                        {stage.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* BACK FACE */}
                                            <div
                                                className="absolute inset-0 h-full w-full p-6 bg-zinc-950 border border-[var(--stage-color)]/50 rounded-2xl rotate-y-180 backface-hidden flex flex-col justify-center items-center text-center"
                                                style={style}
                                            >
                                                <div className="absolute inset-0 bg-[var(--stage-color-20)] opacity-20" />

                                                {/* Stat Value */}
                                                <div className="relative z-10 mb-2">
                                                    <span className="text-4xl font-bold text-[var(--stage-color)] font-display block mb-1">
                                                        {stage.stats?.value || "N/A"}
                                                    </span>
                                                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                                                        Target Metric
                                                    </span>
                                                </div>

                                                {/* Stat Title */}
                                                <h4 className="relative z-10 text-white font-bold text-lg mb-4">
                                                    {stage.stats?.title || "Friction Point"}
                                                </h4>

                                                {/* Logic */}
                                                <div className="relative z-10 px-3 py-2 bg-zinc-900/80 rounded-lg border border-white/10">
                                                    <code className="text-xs text-zinc-400 font-mono">
                                                        {stage.stats?.logic || "Analyze Signal"}
                                                    </code>
                                                </div>

                                                <div className="absolute bottom-4 text-[10px] text-[var(--stage-color)] uppercase tracking-wider font-bold opacity-60">
                                                    Lowers Friction
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Desktop Arrow Connector */}
                                    {index !== ideology.stages.length - 1 && (
                                        <div
                                            className="hidden md:flex items-center justify-center px-2 relative z-20"
                                            style={style} // Apply stage colors to this container
                                        >
                                            <motion.svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-6 h-6"
                                            >
                                                <motion.path
                                                    d="M6 17l5-5-5-5"
                                                    initial={{ stroke: "#52525b", opacity: 0.3 }}
                                                    animate={{ stroke: "var(--stage-color)", opacity: 1 }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                <motion.path
                                                    d="M13 17l5-5-5-5"
                                                    initial={{ stroke: "#52525b", opacity: 0.3 }}
                                                    animate={{ stroke: "var(--stage-color)", opacity: 1 }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        ease: "easeInOut",
                                                        delay: 0.2 // Stagger specifically for flow
                                                    }}
                                                />
                                            </motion.svg>
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

