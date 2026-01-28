"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    History,
    Bot,
    Settings,
    LogOut,
    ShieldAlert
} from "lucide-react";

const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Audit History", href: "/dashboard/history", icon: History },
    { name: "Pro Tools", href: "/dashboard/tools", icon: Bot },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="flex h-16 items-center border-b border-white/10 px-6">
                <Link href="/" className="flex items-center gap-2 font-display font-bold text-white tracking-tighter">
                    <ShieldAlert className="w-6 h-6 text-orange-500" />
                    <span>REV<span className="text-zinc-500">OPS</span></span>
                </Link>
            </div>

            <nav className="flex-1 space-y-1 px-4 py-4">
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-orange-500" : "text-zinc-500 group-hover:text-white"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-white/10 p-4">
                <button className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-red-400 rounded-xl transition-colors hover:bg-red-500/10">
                    <LogOut className="mr-3 h-5 w-5 text-zinc-500 group-hover:text-red-400" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
