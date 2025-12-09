'use client';

import { useState, useRef, useEffect } from 'react';
import WalletModal from '@/components/WalletModal';
import TokensSidebar from '@/components/TokensSidebar';
import ChatHeader from '@/components/ChatHeader';
import MobileHeader from '@/components/MobileHeader';
import MobileTokensDropdown from '@/components/MobileTokensDropdown';
import ChatMessagesArea from '@/components/ChatMessagesArea';
import ChatInputArea from '@/components/ChatInputArea';
import { mockTokens, mockChatMessages } from '@/lib/mockData';
import { ChatMessage as ChatMessageType } from '@/types';
import { sendMessage } from '@/services/chat';

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
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Send message to API
      const response = await sendMessage(content);

      // Log the full response to console
      console.log('API Response:', response);

      // Log specific parts for debugging
      if (response?.data) {
        console.log('Message:', response.data.message);
        console.log('Intent:', response.data.intent);
      }

      if (response?.meta) {
        console.log('Meta:', response.meta);
      }

      // Check for error
      if (response?.error) {
        console.error('Error from API:', response.error);
        const errorMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: `Sorry, I encountered an error: ${response.error}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else if (response?.data?.message) {
        // Add AI response to chat
        const aiMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: response.data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Fallback message if response doesn't have expected structure
        const fallbackMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: "I received your message but couldn't generate a proper response. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `Sorry, I encountered an error: ${error.message || 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Desktop Sidebar - Tokens */}
      <TokensSidebar tokens={mockTokens} />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Desktop Header */}
        <ChatHeader />

        {/* Mobile Header */}
        <MobileHeader
          tokenCount={mockTokens.length}
          onToggleTokens={() => setShowTokens(!showTokens)}
        />

        {/* Mobile Tokens Dropdown */}
        <MobileTokensDropdown
          isOpen={showTokens}
          tokens={mockTokens}
          onClose={() => setShowTokens(false)}
        />

        {/* Messages Container */}
        <ChatMessagesArea
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />

        {/* Chat Input - Fixed at bottom */}
        <ChatInputArea
          inputText={inputText}
          isTyping={isTyping}
          onSend={handleSendMessage}
          onInputChange={setInputText}
          onWalletClick={() => setIsWalletOpen(true)}
        />
      </main>

      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
    </div>
  );
}
