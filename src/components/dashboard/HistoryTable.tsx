"use client";

import { Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

const historyData = [
    { id: "audit_1", date: "Jan 24, 2026", type: "Full Audit", score: 61, status: "completed" },
    { id: "audit_2", date: "Dec 12, 2025", type: "Quick Scan", score: 58, status: "completed" },
    { id: "audit_3", date: "Nov 05, 2025", type: "Full Audit", score: 42, status: "archived" },
];

export function HistoryTable() {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50">
            <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-white/5 text-xs uppercase font-medium text-white">
                    <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Score</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {historyData.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-zinc-300">{item.date}</td>
                            <td className="px-6 py-4 text-white font-medium">{item.type}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.score >= 60 ? 'bg-amber-400/10 text-amber-400 ring-amber-400/20' : 'bg-red-400/10 text-red-400 ring-red-400/20'
                                    }`}>
                                    {item.score}/100
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="capitalize">{item.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link href={`/dashboard`} className="text-orange-500 hover:text-orange-400 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                                    View <ArrowRight className="w-3 h-3" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
