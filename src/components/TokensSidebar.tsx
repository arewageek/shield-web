import TokenCard from './TokenCard';
import { Token } from '@/types';

interface TokensSidebarProps {
    tokens: Token[];
    className?: string;
}

export default function TokensSidebar({ tokens, className = '' }: TokensSidebarProps) {
    return (
        <aside
            className={`hidden lg:flex lg:w-80 xl:w-96 flex-col ${className}`}
            style={{ backgroundColor: 'var(--color-surface)', borderRight: `1px solid var(--color-border)` }}
        >
            <div className="p-6" style={{ borderBottom: `1px solid var(--color-border)` }}>
                <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    Your Tokens
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {tokens.length} active tokens
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {tokens.map((token) => (
                    <TokenCard key={token.id} token={token} />
                ))}

                {tokens.length === 0 && (
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
    );
}
