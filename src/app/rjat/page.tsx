"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { RJATHero } from "@/components/sections/RJATHero";
import { RJATForm } from "@/components/forms/RJATForm";
import { ProcessingState } from "@/components/rjat/ProcessingState";
import { PaymentGate } from "@/components/rjat/PaymentGate";
import { AnimatePresence, motion } from "motion/react";

type RJATState = "idle" | "processing" | "complete";

export default function RJATPage() {
    const [status, setStatus] = useState<RJATState>("idle");
    const [progress, setProgress] = useState(0);

    const startAnalysis = async (data: { url: string; email: string }) => {
        setStatus("processing");
        setProgress(0);

        // Simulation of processing steps
        const duration = 5000; // 5 seconds total
        const interval = 50;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setProgress((currentStep / steps) * 100);

            if (currentStep >= steps) {
                clearInterval(timer);
                setStatus("complete");
            }
        }, interval);

        // Here we would actually call the API
        // await fetch('/api/rjat', { ... })
    };

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden selection:bg-orange-500/30">
            <Header />
            <main className="flex-grow pb-24 relative overflow-hidden">
                <RJATHero />

                <Container className="relative z-10 min-h-[400px] flex justify-center">
                    <AnimatePresence mode="wait">
                        {status === "idle" && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full"
                            >
                                <RJATForm onSubmit={startAnalysis} isLoading={false} />
                            </motion.div>
                        )}

                        {status === "processing" && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="w-full"
                            >
                                <ProcessingState progress={progress} stage="scanning" />
                            </motion.div>
                        )}

                        {status === "complete" && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                <PaymentGate />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
