export interface Token {
    id: string;
    name: string;
    symbol: string;
    description: string;
    owner: string;
    charityWallet: string;
    marketingWallets: string[];
    transactionTax: number; // percentage
    logoUrl?: string;
    createdAt: Date;
    totalSupply: string;
    charityAllocation: string; // Amount allocated for charity
    status: 'active' | 'paused' | 'completed';
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
    tokenData?: Partial<Token>; // For displaying token creation cards
    isTyping?: boolean;
}

export interface Donation {
    id: string;
    tokenId: string;
    amount: string;
    charityWallet: string;
    timestamp: Date;
    txHash?: string;
}

export interface WalletInfo {
    address: string;
    label: string;
    type: 'charity' | 'marketing' | 'owner';
}
