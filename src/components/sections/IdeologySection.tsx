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
                <div className="mb-16 text-center">
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

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {ideology.stages.map((stage, index) => {
                        const Icon = icons[stage.icon as keyof typeof icons] || Eye;
                        // Define CSS variables for this specific stage
                        const style = {
                            '--stage-color': stage.color,
                            '--stage-color-20': `${stage.color}20`,
                            '--stage-color-40': `${stage.color}40`,
                        } as React.CSSProperties;

                        return (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative p-6 bg-zinc-900/40 border border-white/10 rounded-2xl transition-all duration-300 hover:border-[var(--stage-color-40)] hover:shadow-[0_0_20px_-5px_var(--stage-color-40)]"
                                style={style}
                            >
                                {/* Glow Effect */}
                                <div
                                    className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[var(--stage-color)]"
                                />

                                <div
                                    className="mb-4 inline-flex items-center justify-center p-3 rounded-lg bg-zinc-800/50 text-zinc-400 transition-colors duration-300 group-hover:bg-[var(--stage-color-20)] group-hover:text-[var(--stage-color)]"
                                >
                                    <Icon className="w-6 h-6 transition-colors duration-300 text-current" />
                                </div>

                                <div className="text-4xl font-bold bg-clip-text text-transparent absolute top-4 right-6 opacity-10 select-none font-display" style={{ backgroundImage: `linear-gradient(to bottom, #fff, ${stage.color})` }}>
                                    0{stage.id}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">{stage.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {stage.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

