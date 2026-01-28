"use client";

import { Container } from "@/components/layout/Container";
import { BentoGrid, BentoGridItem } from "@/components/layout/BentoGrid";
import { BarChart3, Clock, Bot, Zap } from "lucide-react";

const features = [
    {
        title: "Revenue Dashboard",
        description: "Visualize your entire revenue engine in one place. Track leaks, conversion rates, and projected growth in real-time.",
        icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
        href: "#"
    },
    {
        title: "Historical Data",
        description: "Access up to 2 years of audit history to track your improvements and architectural evolution.",
        icon: <Clock className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
        href: "#"
    },
    {
        title: "Pro Tools Access",
        description: "Unlock the AI Architect Chat and Landing Page Generator to speed up execution.",
        icon: <Bot className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
        href: "#"
    },
    {
        title: "Credit System",
        description: "Flexible credit system for one-off analyses or deep-dive simulations.",
        icon: <Zap className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
        href: "#"
    },
];

export function FeaturesBreakdown() {
    return (
        <section className="py-20 border-b border-white/5 bg-zinc-900/20">
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Everything you need to scale</h2>
                    <p className="text-zinc-400">Powerful tools built for modern revenue leaders.</p>
                </div>
                <BentoGrid>
                    {features.map((feature, idx) => (
                        <BentoGridItem key={idx} {...feature} header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />} />
                    ))}
                </BentoGrid>
            </Container>
        </section>
    );
}
