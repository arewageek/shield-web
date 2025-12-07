'use client';

import { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
    message: ChatMessageType;
    index?: number;
}

export default function ChatMessage({ message, index = 0 }: ChatMessageProps) {
    const isUser = message.role === 'user';

    if (message.isTyping) {
        return (
            <div className="flex items-start gap-3 mb-4 animate-fade-in">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0" style={{ backgroundColor: 'var(--color-shield-blue)' }}>
                    AI
                </div>
                <div className="flex-1 max-w-[80%]">
                    <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full animate-pulse-custom" style={{ backgroundColor: 'var(--color-shield-blue)' }}></span>
                            <span className="w-2 h-2 rounded-full animate-pulse-custom" style={{ backgroundColor: 'var(--color-shield-blue)', animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 rounded-full animate-pulse-custom" style={{ backgroundColor: 'var(--color-shield-blue)', animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex items-start gap-3 mb-4 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
        >
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                style={{
                    ...(isUser
                        ? { background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }
                        : { backgroundColor: 'var(--color-shield-blue)' }
                    ),
                    animationDelay: `${index * 0.1}s`
                }}
            >
                {isUser ? 'You' : 'AI'}
            </div>

            <div className={`flex-1 ${isUser ? 'max-w-[80%] ml-auto' : 'max-w-[80%]'}`}>
                <div
                    className={`rounded-2xl px-4 py-3 ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                    style={isUser
                        ? { backgroundColor: 'var(--color-shield-blue)', color: 'white' }
                        : { backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }
                    }
                >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                    </p>

                    {message.tokenData && (
                        <div className="mt-3 p-3 rounded-xl" style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{message.tokenData.logoUrl || '🪙'}</span>
                                <div>
                                    <div className="font-semibold">{message.tokenData.name}</div>
                                    <div className="text-xs opacity-80">${message.tokenData.symbol}</div>
                                </div>
                            </div>
                            <div className="text-xs opacity-90 mt-2">
                                Tax: {message.tokenData.transactionTax}% • Supply: {message.tokenData.totalSupply}
                            </div>
                        </div>
                    )}
                </div>

                <div className={`text-xs mt-1 px-1 ${isUser ? 'text-right' : ''}`} style={{ color: 'var(--color-text-tertiary)' }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}
