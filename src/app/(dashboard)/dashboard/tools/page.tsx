import { ChatInterface } from "@/components/pro-tools/ChatInterface";
import { LandingPageGenerator } from "@/components/pro-tools/LandingPageGenerator";
import { BlurGate } from "@/components/dashboard/BlurGate";

export default function ProToolsPage() {
    // Mock Tier
    const userTier = "Free";
    const isPro = userTier !== "Free";

    return (
        <div className="max-w-7xl mx-auto space-y-8 h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Pro Tools</h1>
                    <p className="text-zinc-400">AI-powered workflow automation.</p>
                </div>
            </div>

            <BlurGate
                isLocked={!isPro}
                title="Unlock Pro Tools"
                description="Gain access to our Revenue Architect AI and Landing Page Generator."
                cta="Upgrade to Member"
                className="h-full"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                    {/* Chat Section */}
                    <div className="lg:col-span-1 h-full">
                        <ChatInterface />
                    </div>

                    {/* Generator Section */}
                    <div className="lg:col-span-2 h-full">
                        <LandingPageGenerator />
                    </div>
                </div>
            </BlurGate>
        </div>
    );
}
