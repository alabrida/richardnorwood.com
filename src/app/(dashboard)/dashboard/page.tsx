import { BlurGate } from "@/components/dashboard/BlurGate";
import { ScoreRadarChart } from "@/components/dashboard/ScoreRadarChart";
import { LeakList } from "@/components/dashboard/LeakList";
import { Zap, TrendingUp, DollarSign } from "lucide-react";

export default function DashboardPage() {
    // Mock user tier
    const userTier = "Free";
    const isPro = userTier !== "Free";

    const chartData = [
        { stage: "Awareness", score: 80, fullMark: 100 },
        { stage: "Consideration", score: 45, fullMark: 100 },
        { stage: "Decision", score: 60, fullMark: 100 },
        { stage: "Conversion", score: 30, fullMark: 100 },
        { stage: "Retention", score: 90, fullMark: 100 },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Revenue Overview</h1>
                    <p className="text-zinc-400">Welcome back, Richard. Your engine is running at 61% efficiency.</p>
                </div>
                <div className="text-right hidden md:block">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                        {userTier} Plan
                    </span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Rev Score", value: "61/100", icon: Zap, color: "text-amber-400" },
                    { label: "Active Leaks", value: "3 Critical", icon: TrendingUp, color: "text-red-400" },
                    // Conditional Logic: Free Tier sees Action Plan, Pro Tier sees Lost Revenue
                    isPro
                        ? { label: "Lost Revenue", value: "~$12k/mo", icon: DollarSign, color: "text-emerald-400" }
                        : { label: "Top Recommendation", value: "Fix Conversion", icon: Zap, color: "text-blue-400" },
                ].map((stat) => (
                    <div key={stat.label} className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-zinc-950 border border-white/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
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

                        <BlurGate isLocked={!isPro} title="Unlock Leak Details" description="Upgrade to see exactly where you are losing revenue.">
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
