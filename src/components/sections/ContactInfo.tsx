"use client";

import { Container } from "@/components/layout/Container";
import { Mail, Clock, Linkedin, Twitter } from "lucide-react";
import content from "@/content/contact.json";

export function ContactInfo() {
    const { info } = content;

    return (
        <section className="py-20 border-t border-white/5 bg-zinc-950/50">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Email */}
                    <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900/50 transition-colors">
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Email Us</h4>
                        <a href={`mailto:${info.email}`} className="text-zinc-400 hover:text-white transition-colors">
                            {info.email}
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900/50 transition-colors">
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Office Hours</h4>
                        <p className="text-zinc-400">
                            {info.hours}
                        </p>
                    </div>

                    {/* Social */}
                    <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 flex flex-col items-center text-center hover:bg-zinc-900/50 transition-colors">
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                            <Linkedin className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Social Profiles</h4>
                        <div className="flex gap-4">
                            {info.social.map((link, idx) => (
                                <a key={idx} href={link.url} className="text-zinc-400 hover:text-white transition-colors text-sm">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
