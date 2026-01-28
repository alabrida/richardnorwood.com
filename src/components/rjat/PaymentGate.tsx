"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";

export function PaymentGate() {
    return (
        <div className="relative w-full max-w-4xl mx-auto bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
            {/* Blurred Content Placeholder */}
            <div className="filter blur-md opacity-50 p-8 select-none pointer-events-none">
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="h-40 bg-zinc-800 rounded-xl"></div>
                    <div className="h-40 bg-zinc-800 rounded-xl"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-8 bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-800 rounded w-full"></div>
                    <div className="h-4 bg-zinc-800 rounded w-full"></div>
                    <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                </div>
            </div>

            {/* Gate Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 text-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
                    <Lock className="w-8 h-8 text-orange-500" />
                </div>

                <h2 className="text-3xl font-display font-bold text-white mb-3">Report Ready</h2>
                <p className="text-zinc-400 max-w-md mb-8">
                    We've identified 3 critical leaks in your revenue engine. Unlock the full report to see the detailed breakdown and remediation plan.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <Link href="/pricing" className="w-full">
                        <Button className="w-full h-12 text-base bg-orange-600 hover:bg-orange-500 text-white">
                            Get Full Access
                        </Button>
                    </Link>
                    <Link href="/contact" className="w-full">
                        <Button variant="outline" className="w-full h-12 text-base border-zinc-700 hover:bg-zinc-800 text-white">
                            Book Review Call
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
