"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Globe, Loader2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function LandingPageGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulation
        setTimeout(() => {
            setIsGenerating(false);
            setGeneratedUrl("https://preview.richardnorwood.com/lp/demo-123");
        }, 3000);
    };

    return (
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl h-full flex flex-col">
            <div className="p-6 border-b border-white/10 bg-zinc-950/50">
                <div className="flex items-center gap-2 mb-2">
                    <Code className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-white">Landing Page Generator</h3>
                </div>
                <p className="text-sm text-zinc-400">
                    Auto-generate high-converting pages based on your audit gaps.
                </p>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center justify-center min-h-[300px]">
                {!generatedUrl ? (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-zinc-950 rounded-full flex items-center justify-center mx-auto border border-white/10 border-dashed">
                            <Globe className="w-8 h-8 text-zinc-600" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-zinc-300">Ready to build your <strong>Upsell Campaign</strong> page?</p>
                            <p className="text-xs text-zinc-500">Based on: <span className="text-orange-400">Retention Leak #3</span></p>
                        </div>
                        <Button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white min-w-[200px]"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    Generate Page <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full flex flex-col"
                    >
                        <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-2 mb-4 flex items-center justify-between">
                            <code className="text-xs text-emerald-400">{generatedUrl}</code>
                            <Button size="sm" variant="ghost" className="h-6 text-xs text-zinc-400 hover:text-white">Copy</Button>
                        </div>
                        <div className="flex-1 bg-white rounded-lg w-full flex items-center justify-center relative overflow-hidden group">
                            {/* Mock Preview */}
                            <div className="absolute inset-0 bg-zinc-100 flex flex-col p-4 space-y-4 opacity-50 pointer-events-none grayscale group-hover:grayscale-0 transition-all">
                                <div className="h-8 bg-zinc-300 rounded w-1/2 mx-auto" />
                                <div className="h-32 bg-zinc-200 rounded w-full" />
                                <div className="h-4 bg-zinc-300 rounded w-3/4 mx-auto" />
                            </div>
                            <div className="relative z-10 text-center">
                                <span className="text-black font-bold text-lg">Preview Mode</span>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <Button className="flex-1 bg-zinc-100 text-zinc-900 hover:bg-white">Edit Content</Button>
                            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white">Deploy to GitHub</Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
