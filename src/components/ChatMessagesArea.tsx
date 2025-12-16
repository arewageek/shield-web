import { RefObject } from 'react';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessagesAreaProps {
    messages: ChatMessageType[];
    isTyping: boolean;
    messagesEndRef: RefObject<HTMLDivElement | null>;
    error?: string;
}

export default function ChatMessagesArea({ messages, isTyping, messagesEndRef, error }: ChatMessagesAreaProps) {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 pb-4">
            <div className="max-w-3xl mx-auto">
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 animate-fade-in">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Welcome Message */}
                {messages.length === 0 && !error && (
                    <div className="text-center py-12 animate-fade-in">
                        <div
                            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-3xl"
                            style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}
                        >
                            🛡️
                        </div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                            Welcome to Shield Token Bot
                        </h2>
                        <p className="max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                            I'll help you create charity tokens on the Base blockchain. Let's make a difference together!
                        </p>
                    </div>
                )}

                {/* Chat Messages */}
                {messages.map((message, index) => (
                    <ChatMessage key={message.id} message={message} index={index} />
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <ChatMessage
                        message={{
                            id: 'typing',
                            role: 'agent',
                            content: '',
                            timestamp: new Date(),
                            isTyping: true,
                        }}
                    />
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
