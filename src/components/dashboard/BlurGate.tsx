"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlurGateProps {
    children: React.ReactNode;
    isLocked: boolean;
    title?: string;
    description?: string;
    cta?: string;
    ctaLink?: string;
    className?: string; // Additional classes for the wrapper
}

export function BlurGate({
    children,
    isLocked,
    title = "Pro Feature",
    description = "Upgrade your plan to unlock this insight.",
    cta = "Upgrade Now",
    ctaLink = "/pricing",
    className
}: BlurGateProps) {
    if (!isLocked) {
        return <>{children}</>;
    }

    return (
        <div className={cn("relative overflow-hidden rounded-xl", className)}>
            <div className="filter blur-md pointer-events-none select-none opacity-50">
                {children}
            </div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/60 p-6 text-center">
                <div className="rounded-full bg-zinc-900 p-3 border border-white/10 mb-4 shadow-xl">
                    <Lock className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 mb-6 max-w-xs">{description}</p>
                <Link href={ctaLink}>
                    <Button className="bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20">
                        {cta}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
