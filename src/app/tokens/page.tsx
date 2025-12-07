'use client';

import TokenCard from '@/components/TokenCard';
import { mockTokens } from '@/lib/mockData';

export default function TokensPage() {
    return (
        <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                All Tokens
                            </h2>
                            {/* Filter/Sort could go here */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockTokens.map((token) => (
                                <TokenCard key={token.id} token={token} />
                            ))}
                        </div>

                        {mockTokens.length === 0 && (
                            <div className="text-center py-12">
                                <p style={{ color: 'var(--color-text-secondary)' }}>No tokens found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
