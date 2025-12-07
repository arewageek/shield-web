import { Token, ChatMessage } from '@/types';

export const mockTokens: Token[] = [
    {
        id: '1',
        name: 'Hope for Children',
        symbol: 'HOPE',
        description: 'A charity token supporting children\'s education worldwide',
        owner: '0x1234...5678',
        charityWallet: '0xabcd...ef01',
        marketingWallets: ['0x2345...6789', '0x3456...7890'],
        transactionTax: 5,
        logoUrl: '🎓',
        createdAt: new Date('2024-12-01'),
        totalSupply: '1000000',
        charityAllocation: '50000',
        status: 'active',
    },
];

export const mockChatMessages: ChatMessage[] = [
    {
        id: '1',
        role: 'agent',
        content: 'Hello! I\'m the Shield Token Bot. I can help you create charity tokens on the Base blockchain. What cause would you like to support?',
        timestamp: new Date(Date.now()),
    },
    {
        id: '3',
        role: 'agent',
        content: 'To get started, I\'ll need a few details:\n\n1. Token name (e.g., "Save Paws")\n2. Token symbol (e.g., "PAWS")\n3. Charity wallet address\n4. Transaction tax percentage (typically 3-5%)\n\nWhat would you like to name your token?',
        timestamp: new Date(Date.now()),
    },
];

export const mockDonationAmount = '50000'; // Amount in token units
