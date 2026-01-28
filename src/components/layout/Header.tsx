"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button"; // Placeholder, will create UI folder next
import { motion } from "motion/react";

const navLinks = [
    { href: "/services", label: "Partnership" },
    { href: "/rjat", label: "Assessment Tool" },
    { href: "/blog", label: "Insights" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
        >
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-display font-bold text-white tracking-tighter">
                        RICHARD NORWOOD
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-white hover:text-zinc-300">
                        Sign In
                    </Link>
                    <Link href="/audit">
                        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
                            Start Audit
                        </button>
                    </Link>
                </div>
            </Container>
        </motion.header>
    );
}
