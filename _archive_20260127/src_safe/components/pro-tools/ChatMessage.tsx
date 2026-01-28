import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
    const isAssistant = role === 'assistant';

    return (
        <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
            <div
                className={`max-w-[80%] p-4 rounded-[var(--radius-lg)] ${isAssistant
                    ? 'bg-[var(--color-background)] border border-[var(--color-border)]'
                    : 'bg-[var(--color-primary)] text-white'
                    }`}
            >
                <div className={`text-xs font-bold mb-1 ${isAssistant ? 'text-[var(--color-primary)]' : 'text-blue-100'}`}>
                    {isAssistant ? 'Strategy Assistant' : 'You'}
                </div>
                <div className={`prose prose-sm ${isAssistant ? 'prose-invert' : 'prose-invert text-white'}`}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
