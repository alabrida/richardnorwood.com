'use client';

import Link from 'next/link';

interface BlurGateProps {
    children: React.ReactNode;
    isLocked: boolean;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
}

export function BlurGate({
    children,
    isLocked,
    title = "Unlock Pro Features Tools",
    description = "Upgrade to Pro to access this feature and fix your revenue leaks.",
    ctaText = "Upgrade Now",
    ctaHref = "/pricing"
}: BlurGateProps) {
    if (!isLocked) {
        return <>{children}</>;
    }

    return (
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
            {/* Blurred Content */}
            <div className="filter blur-md pointer-events-none select-none opacity-50 p-6" aria-hidden="true">
                {children}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-transparent to-[var(--color-background)]/90">
                <div className="max-w-md space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-[var(--color-muted)]">{description}</p>
                    <Link
                        href={ctaHref}
                        className="inline-block px-6 py-3 text-sm font-bold text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] rounded-[var(--radius-lg)] transition-colors shadow-lg shadow-[rgba(255,102,0,0.2)]"
                    >
                        {ctaText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
