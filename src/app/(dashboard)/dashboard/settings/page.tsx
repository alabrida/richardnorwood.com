import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Account Settings</h1>
                <p className="text-zinc-400">Manage your profile and subscription preferences.</p>
            </div>

            <div className="space-y-6">
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Profile Information</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-400">Full Name</label>
                            <Input defaultValue="Richard Norwood" className="bg-zinc-950 border-white/10" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-400">Email Address</label>
                            <Input defaultValue="richard@alabrida.com" className="bg-zinc-950 border-white/10" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">Save Changes</Button>
                    </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Subscription</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-white">Current Plan: <span className="text-orange-500">Free Tier</span></p>
                            <p className="text-sm text-zinc-500">Upgrade to unlock Pro Tools and detailed reports.</p>
                        </div>
                        <Button className="bg-orange-600 hover:bg-orange-500 text-white">Upgrade Plan</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
