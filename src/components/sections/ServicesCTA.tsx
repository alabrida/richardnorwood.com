"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import content from "@/content/services.json";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesCTA() {
    const { cta } = content;

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 to-transparent pointer-events-none" />

            <Container className="text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto p-12 rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        {cta.title}
                    </h2>
                    <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
                        {cta.subtitle}
                    </p>

                    <Link href={cta.button_href}>
                        <Button size="lg" className="h-16 px-10 rounded-full text-lg bg-white text-black hover:bg-zinc-200 gap-2 font-semibold">
                            {cta.button_text} <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
