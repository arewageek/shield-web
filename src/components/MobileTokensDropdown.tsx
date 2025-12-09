import TokenCard from './TokenCard';
import { Token } from '@/types';

interface MobileTokensDropdownProps {
    isOpen: boolean;
    tokens: Token[];
    onClose: () => void;
}

export default function MobileTokensDropdown({ isOpen, tokens, onClose }: MobileTokensDropdownProps) {
    if (!isOpen) return null;

    return (
        <div
            className="lg:hidden p-4 space-y-3 max-h-80 overflow-y-auto animate-slide-up"
            style={{ backgroundColor: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Your Tokens
                </h3>
                <button
                    onClick={onClose}
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--color-text-tertiary)' }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {tokens.map((token) => (
                <TokenCard key={token.id} token={token} />
            ))}
        </div>
    );
}
