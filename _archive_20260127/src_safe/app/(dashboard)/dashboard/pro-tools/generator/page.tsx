'use client';

import { LandingPageGenerator } from '@/components/pro-tools/LandingPageGenerator';

export default function GeneratorToolPage() {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Landing Page Generator</h1>
                <p className="text-[var(--color-muted)]">
                    Create high-converting landing pages tailored to your revenue leaks.
                </p>
            </div>

            <div className="flex-1">
                <LandingPageGenerator />
            </div>
        </div>
    );
}
