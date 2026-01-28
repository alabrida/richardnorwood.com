import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div className={cn("flex w-full gap-4 p-4", isUser ? "bg-transparent" : "bg-white/5 rounded-2xl")}>
            <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10",
                isUser ? "bg-zinc-800" : "bg-orange-500/10 text-orange-500"
            )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className="flex-1 space-y-2 overflow-hidden">
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-zinc-300">
                    {/* Basic newline handling for now, can upgrade to markdown-to-jsx later */}
                    {content.split('\n').map((line, i) => (
                        <p key={i} className="min-h-[1em]">{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
