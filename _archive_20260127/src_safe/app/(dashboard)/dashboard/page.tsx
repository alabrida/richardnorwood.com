'use client';

import { ScoreRadarChart } from '@/components/dashboard/ScoreRadarChart';
import { LeakList } from '@/components/dashboard/LeakList';
import { BlurGate } from '@/components/dashboard/BlurGate';
import { HistoryTable } from '@/components/dashboard/HistoryTable';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();
    }, []);

    const mockRadarData = [
        { stage: 'Awareness', score: 2, fullMark: 3 },
        { stage: 'Consideration', score: 1, fullMark: 3 },
        { stage: 'Decision', score: 3, fullMark: 3 },
        { stage: 'Conversion', score: 1.5, fullMark: 3 },
        { stage: 'Retention', score: 1, fullMark: 3 },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}
                </h1>
                <p className="text-[var(--color-muted)]">
                    Here is the current state of your Revenue Engine.
                </p>
            </div>

            {/* Top Row: Chart + Leaks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Radar Chart */}
                <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
                    <h2 className="text-xl font-bold mb-6">Engine Health</h2>
                    <ScoreRadarChart data={mockRadarData} />
                    <div className="mt-4 text-center">
                        <span className="text-2xl font-bold text-[var(--color-warning)]">1.7/3.0</span>
                        <p className="text-sm text-[var(--color-muted)]">Fragmented System</p>
                    </div>
                </div>

                {/* Leak List - Blurred for Free users (Simulation) */}
                <div className="lg:col-span-2 p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Priority Leaks</h2>
                        <span className="text-sm text-[var(--color-muted)]">Top 5 Detected</span>
                    </div>

                    {/* Simulate Free Tier - Locked Leaks */}
                    <BlurGate isLocked={false} title="Unlock Detailed Fixes">
                        <LeakList />
                    </BlurGate>
                </div>
            </div>

            {/* Pro Tools Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
                    <h2 className="text-xl font-bold mb-4">AI Strategy Assistant</h2>
                    <p className="text-[var(--color-muted)] mb-6">Chat with your data to uncover hidden insights.</p>
                    <BlurGate isLocked={true} title="Pro Feature: AI Chat">
                        <div className="h-32 bg-[var(--color-background)] rounded-[var(--radius-lg)]"></div>
                    </BlurGate>
                </div>

                <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
                    <h2 className="text-xl font-bold mb-4">Landing Page Generator</h2>
                    <p className="text-[var(--color-muted)] mb-6">Generate high-converting pages in seconds.</p>
                    <BlurGate isLocked={true} title="Pro Feature: Page Generator">
                        <div className="h-32 bg-[var(--color-background)] rounded-[var(--radius-lg)]"></div>
                    </BlurGate>
                </div>
            </div>

            {/* History Table */}
            <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
                <h2 className="text-xl font-bold mb-6">Recent Assessments</h2>
                <HistoryTable />
            </div>
        </div>
    );
}
