"use client";

import { Container } from "@/components/layout/Container";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { EmailDeliveryForm } from "@/components/forms/EmailDeliveryForm";
import { motion } from "motion/react";
import { Check, Lock, Sparkles, Mail } from "lucide-react";

export default function RjatSqueezePage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden flex flex-col justify-center">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full opacity-30 select-none pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full opacity-20 select-none pointer-events-none" />

            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full mb-6"
                    >
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-semibold tracking-wide uppercase">Assessment Complete</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
                    >
                        Your Revenue Audit is Ready.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400"
                    >
                        We've identified the leaks in your engine. Choose how you want to unlock your personalized roadmap.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Option 1: Full Access (High Value) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />

                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-xl mb-6 text-indigo-400">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Unlock Full Dashboard</h2>
                            <p className="text-zinc-400 mb-6">Create a free account to access your live revenue scorecard and interactive insights.</p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "Save your progress & history",
                                    "Access the interactive BlurGate visualizer",
                                    "Compare against industry benchmarks",
                                    "Unlock 1 free AI Consultation Credit"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                            <SocialAuthButtons />
                            <p className="text-center text-xs text-zinc-500 mt-4">
                                By continuing, you agree to our Terms of Service.
                            </p>
                        </div>
                    </motion.div>

                    {/* Option 2: Email Only (Low Friction) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-zinc-900/20 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col"
                    >
                        <div className="mb-auto">
                            <div className="inline-flex items-center justify-center p-3 bg-zinc-800 rounded-xl mb-6 text-zinc-400">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Just Email Me The Report</h2>
                            <p className="text-zinc-400 mb-6">Get a one-time PDF summary delivered to your inbox. No account created.</p>
                        </div>

                        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 mt-8">
                            <EmailDeliveryForm />
                            <p className="text-center text-xs text-zinc-500 mt-4">
                                You can create an account later to unlock more tools.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </main>
    );
}
