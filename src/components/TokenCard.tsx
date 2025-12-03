'use client';

import { Token } from '@/types';
import Link from 'next/link';

interface TokenCardProps {
    token: Token;
}

export default function TokenCard({ token }: TokenCardProps) {
    const statusColors = {
        active: 'bg-success text-white',
        paused: 'bg-warning text-white',
        completed: 'bg-[var(--text-tertiary)] text-white',
    };

    return (
        <Link href={`/token/${token.id}`}>
            <div className="group bg-surface border border-border rounded-2xl p-4 transition-all hover:shadow-lg hover:border-shield-blue cursor-pointer animate-slide-up">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-shield-blue-light to-shield-blue-dark flex items-center justify-center text-2xl">
                            {token.logoUrl || '🪙'}
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-shield-blue transition-colors">
                                {token.name}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)]">${token.symbol}</p>
                        </div>
                    </div>

                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[token.status]}`}>
                        {token.status}
                    </span>
                </div>

                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {token.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[var(--background)] rounded-xl p-3">
                        <div className="text-xs text-[var(--text-tertiary)] mb-1">Tax</div>
                        <div className="font-semibold text-shield-blue">{token.transactionTax}%</div>
                    </div>

                    <div className="bg-[var(--background)] rounded-xl p-3">
                        <div className="text-xs text-[var(--text-tertiary)] mb-1">Charity Fund</div>
                        <div className="font-semibold text-success">{token.charityAllocation}</div>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-[var(--text-tertiary)]">
                        Created {token.createdAt.toLocaleDateString()}
                    </span>
                    <span className="text-shield-blue group-hover:translate-x-1 transition-transform inline-block">
                        View Details →
                    </span>
                </div>
            </div>
        </Link>
    );
}
