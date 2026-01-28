'use client';

import Link from 'next/link';

interface Leak {
    id: string;
    title: string;
    impact: 'High' | 'Medium' | 'Low';
    stage: string;
    description: string;
}

export function LeakList() {
    // Mock data
    const leaks: Leak[] = [
        {
            id: '1',
            title: 'Unqualified Lead Influx',
            impact: 'High',
            stage: 'Awareness',
            description: '30% of traffic bounces immediately due to poor targeting.'
        },
        {
            id: '2',
            title: 'No Nurture Sequence',
            impact: 'High',
            stage: 'Consideration',
            description: 'Leads who don\'t buy day 1 are lost. Missing automated email flows.'
        },
        {
            id: '3',
            title: 'Manual Onboarding Friction',
            impact: 'Medium',
            stage: 'Conversion',
            description: 'Sales team spends 4h/week manually provisioning accounts.'
        },
        {
            id: '4',
            title: 'No Expansion Offers',
            impact: 'Medium',
            stage: 'Retention',
            description: 'LTV is stagnant because there is no post-purchase upsell path.'
        },
        {
            id: '5',
            title: 'Low Call Show-Up Rate',
            impact: 'Low',
            stage: 'Decision',
            description: '20% of booked calls no-show. Missing SMS reminders.'
        }
    ];

    return (
        <div className="space-y-4">
            {leaks.map((leak, index) => (
                <div key={leak.id} className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center text-[var(--color-error)] font-bold">
                        {index + 1}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-sm">{leak.title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide ${leak.impact === 'High' ? 'bg-[var(--color-error)] text-white' :
                                    leak.impact === 'Medium' ? 'bg-[var(--color-warning)] text-black' :
                                        'bg-[var(--color-success)] text-white'
                                }`}>
                                {leak.impact}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--color-muted)] mb-2">
                            {leak.description}
                        </p>
                        <Link href={`/rjat/fix/${leak.id}`} className="text-xs text-[var(--color-primary)] font-medium hover:underline">
                            View Fix →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
