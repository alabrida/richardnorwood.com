import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-black text-white selection:bg-orange-500/30 overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Header could go here if needed, but sidebar covers nav */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md z-10 w-full lg:hidden">
                    {/* Mobile Hamburger would go here */}
                    <span className="font-bold">Dashboard</span>
                </header>

                <main className="flex-1 overflow-y-auto bg-zinc-950 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
