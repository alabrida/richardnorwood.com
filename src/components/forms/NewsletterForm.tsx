"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus("success");
        setEmail("");
    };

    return (
        <div className="w-full max-w-sm">
            <h3 className="font-semibold text-white mb-2">Stay in the Loop</h3>
            <p className="text-sm text-zinc-400 mb-4">
                Get the latest revenue architecture insights delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="relative">
                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500"
                        >
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">Subscribed successfully!</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex gap-2"
                        >
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === "loading"}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-50"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-lg py-2.5 px-4 text-sm font-medium transition-colors flex items-center justify-center min-w-[3rem]"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
