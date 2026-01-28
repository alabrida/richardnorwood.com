'use client';

import { useEffect } from 'react';

export function CalendlyEmbed() {
    useEffect(() => {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head?.appendChild(script);
    }, []);

    return (
        <div
            className="calendly-inline-widget w-full h-[650px] bg-[var(--color-card)] rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden"
            data-url="https://calendly.com/richardnorwood/strategy-call"
        />
    );
}
