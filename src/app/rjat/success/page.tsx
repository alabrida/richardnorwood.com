"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Linkedin } from "lucide-react";
import Link from "next/link";

export default function RjatSuccessPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-20 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full opacity-30 select-none pointer-events-none" />

            <Container>
                <div className="max-w-xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 border border-green-500/20"
                    >
                        <CheckCircle2 className="w-12 h-12" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-display font-bold text-white mb-4"
                    >
                        Report Sent!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 mb-12"
                    >
                        Check your inbox. Your Revenue Architecture Forensics Report should arrive in 1-2 minutes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-zinc-900 border border-white/10 rounded-2xl p-8"
                    >
                        <h3 className="text-white font-bold mb-2">While you wait...</h3>
                        <p className="text-zinc-400 text-sm mb-6">
                            Join 5,000+ founders getting weekly revenue engineering tactics.
                        </p>

                        <div className="flex flex-col gap-3">
                            {/* Placeholder for Newsletter Form if needed, or just a link */}
                            <Link
                                href="/newsletter" // Assuming this exists or will exist
                                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                            >
                                Subscribe to Newsletter
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <a
                                href="https://linkedin.com/in/richardnorwood"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 font-bold py-3 rounded-xl hover:bg-[#0077b5]/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Linkedin className="w-4 h-4" />
                                Connect on LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12"
                    >
                        <Link href="/" className="text-zinc-500 hover:text-white transition-colors text-sm">
                            Back to Homepage
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </main>
    );
}
