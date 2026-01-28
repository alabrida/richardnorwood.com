'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Assessment {
    id: string;
    created_at: string;
    score: number;
}

export function HistoryTable() {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    // Mock data for now since we don't have DB records yet
    useEffect(() => {
        // In production, fetch from supabase
        // const { data } = await supabase.from('assessments').select('*');
        setAssessments([
            { id: '1', created_at: new Date().toISOString(), score: 7 },
        ]);
        setLoading(false);
    }, []);

    if (loading) return <div>Loading history...</div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-[var(--color-border)] text-[var(--color-muted)] text-sm">
                        <th className="py-3 px-4 font-medium">Date</th>
                        <th className="py-3 px-4 font-medium">Score</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map((item) => (
                        <tr key={item.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)]">
                            <td className="py-3 px-4">
                                {new Date(item.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full border ${item.score > 10 ? 'border-[var(--color-success)] text-[var(--color-success)]' :
                                        item.score > 5 ? 'border-[var(--color-warning)] text-[var(--color-warning)]' :
                                            'border-[var(--color-error)] text-[var(--color-error)]'
                                    }`}>
                                    {item.score}/15
                                </span>
                            </td>
                            <td className="py-3 px-4 text-sm">
                                Completed
                            </td>
                            <td className="py-3 px-4 text-right">
                                <Link href={`/rjat/${item.id}`} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                                    View Report
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
