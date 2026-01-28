import { HistoryTable } from "@/components/dashboard/HistoryTable";

export default function HistoryPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Audit History</h1>
                <p className="text-zinc-400">Review your past revenue engine assessments.</p>
            </div>

            <HistoryTable />
        </div>
    );
}
