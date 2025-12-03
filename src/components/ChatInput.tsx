'use client';

import { useState } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || disabled || isSending) return;

        setIsSending(true);
        onSend(message.trim());
        setMessage('');

        // Simulate sending delay
        setTimeout(() => {
            setIsSending(false);
        }, 500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-2 p-4 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    disabled={disabled || isSending}
                    rows={1}
                    className="flex-1 resize-none bg-transparent focus:outline-none max-h-32 min-h-[24px] py-1"
                    style={{
                        color: 'var(--color-text-primary)',
                        minHeight: '24px',
                    }}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                    }}
                />

                <button
                    type="submit"
                    disabled={!message.trim() || disabled || isSending}
                    className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'var(--color-shield-blue)' }}
                    aria-label="Send message"
                    onMouseOver={(e) => !message.trim() ? null : e.currentTarget.style.backgroundColor = 'var(--color-shield-blue-dark)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-shield-blue)'}
                >
                    {isSending ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    )}
                </button>
            </div>

            {message.length > 0 && (
                <div className="absolute -top-6 right-4 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    {message.length}/500
                </div>
            )}
        </form>
    );
}
