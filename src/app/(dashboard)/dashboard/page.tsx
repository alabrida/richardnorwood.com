import { BlurGate } from "@/components/dashboard/BlurGate";
import { ScoreRadarChart } from "@/components/dashboard/ScoreRadarChart";
import { LeakList } from "@/components/dashboard/LeakList";
import { getDashboardData } from "@/lib/dashboard-service";
import { Zap, TrendingUp, DollarSign, Activity } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const { profile, assessment, isPro, computed } = await getDashboardData();

    // Redirect to assessment if no data found
    if (!assessment) {
        // Optional: show a "Welcome Empty State" instead of redirect
        // For now, let's show an empty state within the dashboard
    }

    const chartData = assessment ? [
        { stage: "Awareness", score: assessment.score_awareness || 0, fullMark: 100 },
        { stage: "Consideration", score: assessment.score_consideration || 0, fullMark: 100 },
        { stage: "Decision", score: assessment.score_decision || 0, fullMark: 100 },
        { stage: "Conversion", score: assessment.score_conversion || 0, fullMark: 100 },
        { stage: "Retention", score: assessment.score_retention || 0, fullMark: 100 },
    ] : [
        // Default empty state handles
        { stage: "Awareness", score: 0, fullMark: 100 },
        { stage: "Consideration", score: 0, fullMark: 100 },
        { stage: "Decision", score: 0, fullMark: 100 },
        { stage: "Conversion", score: 0, fullMark: 100 },
        { stage: "Retention", score: 0, fullMark: 100 },
    ];

    const currentScore = assessment?.score_total || 0;
    const leakCount = Array.isArray(assessment?.top_leaks) ? assessment.top_leaks.length : 0;

    if (!assessment) {
        return (
            <div className="max-w-7xl mx-auto py-20 text-center">
                <h1 className="text-3xl font-display font-bold text-white mb-4">Initialize Your Engine</h1>
                <p className="text-zinc-400 mb-8">You haven't run a Revenue Audit yet. We need data to generate your dashboard.</p>
                <Link
                    href="/calculator"
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-500 transition-all"
                >
                    Run 60-Second Audit
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Revenue Overview</h1>
                    <p className="text-zinc-400">Welcome back, {profile?.full_name?.split(' ')[0] || 'Architect'}. Your engine is running at {currentScore}% efficiency.</p>
                    {/* Debug Info (Remove in Prod) */}
                    {/* <p className="text-xs text-zinc-600 mt-1">Tier: {profile?.subscription_tier}</p> */}
                </div>
                <div className="text-right hidden md:block">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${isPro
                        ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
                        : "text-orange-500 bg-orange-500/10 border-orange-500/20"
                        }`}>
                        {profile?.subscription_tier} Plan
                    </span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: "Rev Score",
                        value: `${currentScore}/100`,
                        subtext: computed?.status || "Fragmented",
                        icon: Zap,
                        color: "text-amber-400"
                    },
                    {
                        label: "Status",
                        value: computed?.status || "Fragmented",
                        subtext: "System Health",
                        icon: Activity,
                        color: "text-blue-400"
                    },
                    isPro
                        ? {
                            label: "Projected Loss",
                            value: "~$12k/mo",
                            subtext: "Based on leaks",
                            icon: DollarSign,
                            color: "text-emerald-400"
                        }
                        : {
                            label: "Priority Focus",
                            value: computed?.gaps[0]?.name || "None",
                            subtext: "Weakest Link",
                            icon: TrendingUp,
                            color: "text-red-400"
                        },
                ].map((stat) => (
                    <div key={stat.label} className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-zinc-950 border border-white/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-zinc-600">{stat.subtext}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 px-2">Engine Health</h3>
                    <div className="aspect-square flex items-center justify-center">
                        <ScoreRadarChart data={chartData} />
                    </div>
                </div>

                {/* Leaks Section - LOCKED for Free users */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Priority Leaks</h3>
                        </div>

                        <BlurGate isLocked={!isPro} title="Unlock Leak Forensic Details" description="Upgrade to see exactly where you are losing revenue and how to fix it.">
                            {/* Passing real data to LeakList would require updating LeakList props too, assuming it takes data */}
                            {/* For now, LeakList is likely fetching internally or static. Let's update it later if needed. */}
                            {/* Ideally: <LeakList leaks={assessment.top_leaks} /> */}
                            <LeakList />
                            {/* Fake extra items for blur effect */}
                            <div className="opacity-50 mt-4 space-y-4">
                                <div className="h-24 bg-zinc-800/50 rounded-xl" />
                                <div className="h-24 bg-zinc-800/50 rounded-xl" />
                            </div>
                        </BlurGate>
                    </div>
                </div>
            </div>
        </div>
    );
}
