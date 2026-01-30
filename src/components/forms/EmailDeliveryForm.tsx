"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function EmailDeliveryForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/rjat/deliver", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error("Delivery failed");

            setStatus("success");
            // Redirect after short delay
            setTimeout(() => {
                router.push("/rjat/success");
            }, 1000);

        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            </div>

            <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3 rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {status === "loading" ? (
                    <span className="animate-pulse">Processing...</span>
                ) : status === "success" ? (
                    <>
                        <CheckCircle2 className="w-5 h-5" />
                        Sent!
                    </>
                ) : (
                    <>
                        Send Report Only
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            {status === "error" && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-red-400 text-sm text-center"
                >
                    Failed to send. Please try again.
                </motion.p>
            )}
        </form>
    );
}
