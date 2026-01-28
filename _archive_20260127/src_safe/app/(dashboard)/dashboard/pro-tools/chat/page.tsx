'use client';

import { ChatInterface } from '@/components/pro-tools/ChatInterface';

export default function ChatToolPage() {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Strategy Assistant</h1>
                <p className="text-[var(--color-muted)]">
                    Your AI copilot for revenue architecture decisions.
                </p>
            </div>

            <div className="flex-1">
                <ChatInterface />
            </div>
        </div>
    );
}
