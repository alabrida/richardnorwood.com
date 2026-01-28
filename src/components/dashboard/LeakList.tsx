import { AlertTriangle, ArrowRight } from "lucide-react";

const leaks = [
    {
        id: 1,
        severity: "Critical",
        stage: "Conversion",
        title: "Manual Invoicing Friction",
        impact: "-$12k/mo",
        description: "You are losing 15% of qualified deals due to slow payment collection methods."
    },
    {
        id: 2,
        severity: "High",
        stage: "Awareness",
        title: "Single Channel Dependency",
        impact: "High Risk",
        description: "Reliance on referrals leaves you vulnerable to pipeline droughts."
    },
    {
        id: 3,
        severity: "Medium",
        stage: "Retention",
        title: "No Upsell Trigger",
        impact: "-20% LTV",
        description: "Missing automated check-ins for expansion revenue."
    }
];

export function LeakList() {
    return (
        <div className="space-y-4">
            {leaks.map((leak) => (
                <div key={leak.id} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/30 transition-colors group cursor-pointer">
                    <div className="mt-1">
                        {leak.severity === "Critical" ? (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        ) : (
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{leak.title}</h4>
                            <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-white/5">{leak.impact}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-[90%]">
                            {leak.description}
                        </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors self-center opacity-0 group-hover:opacity-100" />
                </div>
            ))}
        </div>
    );
}
