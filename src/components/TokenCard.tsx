'use client';

import { Token } from '@/types';
import Link from 'next/link';

interface TokenCardProps {
    token: Token;
}

export default function TokenCard({ token }: TokenCardProps) {
    const statusColors = {
        active: { bg: 'var(--color-success)', text: 'white' },
        paused: { bg: 'var(--color-warning)', text: 'white' },
        completed: { bg: 'var(--color-text-tertiary)', text: 'white' },
    };

    const status = statusColors[token.status];

    return (
        <Link href={`/token/${token.id}`}>
            <div className="group rounded-2xl p-4 transition-all cursor-pointer animate-slide-up hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-shield-blue)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                            style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}
                        >
                            {token.logoUrl || '🪙'}
                        </div>
                        <div>
                            <h3 className="font-semibold transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                                {token.name}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>${token.symbol}</p>
                        </div>
                    </div>

                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: status.bg, color: status.text }}>
                        {token.status}
                    </span>
                </div>

                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {token.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--color-background)' }}>
                        <div className="text-xs mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Tax</div>
                        <div className="font-semibold" style={{ color: 'var(--color-shield-blue)' }}>{token.transactionTax}%</div>
                    </div>

                    <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--color-background)' }}>
                        <div className="text-xs mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Charity Fund</div>
                        <div className="font-semibold" style={{ color: 'var(--color-success)' }}>{token.charityAllocation}</div>
                    </div>
                </div>

                <div className="mt-3 pt-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                        Created {token.createdAt.toLocaleDateString()}
                    </span>
                    <span className="transition-transform inline-block group-hover:translate-x-1" style={{ color: 'var(--color-shield-blue)' }}>
                        View Details →
                    </span>
                </div>
            </div>
        </Link>
    );
}
