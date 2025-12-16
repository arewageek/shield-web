'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import WalletModal from '@/components/WalletModal';
import TokensSidebar from '@/components/TokensSidebar';
import ChatHeader from '@/components/ChatHeader';
import MobileHeader from '@/components/MobileHeader';
import MobileTokensDropdown from '@/components/MobileTokensDropdown';
import ChatMessagesArea from '@/components/ChatMessagesArea';
import ChatInputArea from '@/components/ChatInputArea';
import { sendMessage, getMessages } from '@/services/chat';
import { createMessage, mapApiMessages } from '@/utils/chat';
import { mockTokens } from '@/lib/mockData';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [showTokens, setShowTokens] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    const loadMessages = async () => {
      setIsTyping(true);

      try {
        const response = await getMessages();

        if (response?.data) {
          setMessages(mapApiMessages(response.data));
          return;
        }

        if (response?.status !== 'success') {
          setError(response?.message || 'Failed to load messages');
        }
      } catch {
        setError('Failed to load messages');
      } finally {
        setIsTyping(false);
      }
    };

    loadMessages();
  }, []);

  const handleSendMessage = async (content: string) => {
    setMessages((m) => [...m, createMessage('user', content)]);
    setIsTyping(true);

    try {
      let res = await sendMessage(content);

      if (res?.status === 'success' && res?.data) {
        setMessages((m) => [...m, createMessage('agent', res?.data?.data?.message)]);
        return;
      }

      setMessages((m) => [
        ...m,
        createMessage('agent', res?.error || 'Something went wrong'),
      ]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        createMessage('agent', err?.message || 'Unknown error'),
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[var(--color-background)]">
      <TokensSidebar tokens={mockTokens} />

      <main className="flex-1 flex flex-col h-screen">
        <ChatHeader />

        <MobileHeader
          tokenCount={mockTokens.length}
          onToggleTokens={() => setShowTokens((s) => !s)}
        />

        <MobileTokensDropdown
          isOpen={showTokens}
          tokens={mockTokens}
          onClose={() => setShowTokens(false)}
        />

        <ChatMessagesArea
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />

        <ChatInputArea
          inputText={inputText}
          isTyping={isTyping}
          onSend={handleSendMessage}
          onInputChange={setInputText}
          onWalletClick={() => setIsWalletOpen(true)}
        />
      </main>

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />
    </div>
  );
}
