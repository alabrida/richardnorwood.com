import { ReactNode } from 'react';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
    columns?: 1 | 2 | 3 | 4;
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
}

export function BentoGrid({
    children,
    className = '',
    columns = 3
}: BentoGridProps) {
    const colClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div
            className={`grid gap-4 md:gap-6 ${colClasses[columns]} ${className}`}
        >
            {children}
        </div>
    );
}

export function BentoCard({
    children,
    className = '',
    colSpan = 1,
    rowSpan = 1
}: BentoCardProps) {
    const colSpanClasses = {
        1: '',
        2: 'md:col-span-2',
        3: 'md:col-span-2 lg:col-span-3',
        4: 'md:col-span-2 lg:col-span-4',
    };

    const rowSpanClasses = {
        1: '',
        2: 'md:row-span-2',
    };

    return (
        <div
            className={`
        p-6 rounded-[var(--radius-xl)] 
        glass
        hover:border-[var(--color-primary)] 
        transition-colors
        ${colSpanClasses[colSpan]} 
        ${rowSpanClasses[rowSpan]} 
        ${className}
      `}
        >
            {children}
        </div>
    );
}
