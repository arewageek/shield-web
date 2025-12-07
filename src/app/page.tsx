'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TokenCard from '@/components/TokenCard';
import WalletModal from '@/components/WalletModal';
import { mockTokens, mockChatMessages } from '@/lib/mockData';
import { ChatMessage as ChatMessageType } from '@/types';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTokens, setShowTokens] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Simulate initial AI typing
    const timer = setTimeout(() => {
      setIsTyping(true);

      // Delay before showing messages
      setTimeout(() => {
        setMessages(mockChatMessages);
        setIsTyping(false);
      }, 1500);
    }, 500); // Small delay before typing starts

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: "I'm here to help! I'll guide you through creating a charity token. What's the cause you'd like to support?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Desktop Sidebar - Tokens */}
      <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col" style={{ backgroundColor: 'var(--color-surface)', borderRight: `1px solid var(--color-border)` }}>
        <div className="p-6" style={{ borderBottom: `1px solid var(--color-border)` }}>
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Your Tokens
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {mockTokens.length} active tokens
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockTokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}

          {mockTokens.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(0, 102, 255, 0.1)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--color-shield-blue)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                No tokens yet. Start chatting to create your first charity token!
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header - Removed as it's now in AppShell */}
        <div className="hidden md:block px-4 py-4 md:px-6" style={{ backgroundColor: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}>
                S
              </div>
              <div>
                <h1 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Shield
                </h1>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  AI Charity Token Creator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tokens Toggle - Needs to be positioned somewhere accessible or integrated into AppShell header? 
            For now, I'll keep a small sub-header for mobile if needed, or just let the tokens sidebar toggle exist.
            Actually, the Mobile Tokens Toggle was in the header.
            If I remove the header, I lose the toggle.
            The toggle is:
            <button onClick={() => setShowTokens(!showTokens)} ...>
            
            I should probably keep a "Page Header" for the Chat view that contains this toggle, 
            but NOT the main navigation hamburger.
            
            Let's keep a simplified header for the Chat view that has the "Shield" branding (on desktop) 
            and the "Tokens Toggle" (on mobile).
        */}
        <header className="md:hidden px-4 py-3 flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}>
          <span className="font-semibold">Chat</span>
          <button
            onClick={() => setShowTokens(!showTokens)}
            className="p-2 rounded-xl transition-colors relative hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {mockTokens.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-shield-blue)' }}></span>
            )}
          </button>
        </header>

        {/* Mobile Tokens Dropdown */}
        {showTokens && (
          <div className="lg:hidden p-4 space-y-3 max-h-80 overflow-y-auto animate-slide-up" style={{ backgroundColor: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Your Tokens</h3>
              <button
                onClick={() => setShowTokens(false)}
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {mockTokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 pb-4">
          <div className="max-w-3xl mx-auto">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-3xl" style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}>
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

        {/* Chat Input - Fixed at bottom */}
        <div className="px-4 md:px-6 pb-safe md:pb-4" style={{ backgroundColor: 'var(--color-surface)', borderTop: `1px solid var(--color-border)` }}>
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            {!inputText.trim() && (
              <button
                type="button"
                onClick={() => setIsWalletOpen(true)}
                className="flex-shrink-0 w-12 h-12 mb-1 rounded-full text-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--color-shield-blue) 0%, var(--color-shield-blue-dark) 100%)',
                  boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)'
                }}
                aria-label="Connect Wallet"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            )}
            <div className="flex-1">
              <ChatInput
                onSend={(msg) => {
                  handleSendMessage(msg);
                  setInputText('');
                }}
                onInputChange={setInputText}
                disabled={isTyping}
              />
            </div>
          </div>
        </div>
      </main>

      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
    </div>
  );
}
