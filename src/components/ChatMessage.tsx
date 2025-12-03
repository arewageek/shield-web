'use client';

import { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
    message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    if (message.isTyping) {
        return (
            <div className="flex items-start gap-3 mb-4 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-shield-blue flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    AI
                </div>
                <div className="flex-1 max-w-[80%]">
                    <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-shield-blue rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-shield-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 bg-shield-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-start gap-3 mb-4 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ${isUser ? 'bg-gradient-to-br from-shield-blue-light to-shield-blue-dark' : 'bg-shield-blue'
                }`}>
                {isUser ? 'You' : 'AI'}
            </div>

            <div className={`flex-1 ${isUser ? 'max-w-[80%] ml-auto' : 'max-w-[80%]'}`}>
                <div className={`rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-shield-blue text-white rounded-tr-sm'
                        : 'bg-surface border border-border rounded-tl-sm'
                    }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                    </p>

                    {message.tokenData && (
                        <div className="mt-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
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

                <div className={`text-xs text-[var(--text-tertiary)] mt-1 px-1 ${isUser ? 'text-right' : ''}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}
