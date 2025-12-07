'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockTokens } from '@/lib/mockData';
import { useState } from 'react';

export default function TokenDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const token = mockTokens.find((t) => t.id === id) || mockTokens[0]; // Fallback for dev

    const [activeTab, setActiveTab] = useState<'transactions' | 'holders' | 'info'>('transactions');

    if (!token) return <div className="p-8 text-center">Token not found</div>;

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Tokens
                </button>

                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg"
                            style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}
                        >
                            {token.logoUrl || '🪙'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{token.name}</h1>
                            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                                <span className="font-semibold">${token.symbol}</span>
                                <span>•</span>
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-success)] text-white">
                                    {token.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">$0.00420</div>
                        <div className="text-sm font-medium text-[var(--color-success)] flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            +12.5% (24h)
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Market Cap', value: '$420.69K' },
                        { label: 'Liquidity', value: '$69.42K' },
                        { label: 'Holders', value: '1,337' },
                        { label: 'Charity Fund', value: token.charityAllocation },
                    ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">{stat.label}</div>
                            <div className="text-lg font-semibold text-[var(--color-text-primary)]">{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Chart & Tabs */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Chart Placeholder */}
                        <div className="aspect-video rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-shield-blue-light)]/10 to-transparent opacity-50" />
                            <div className="text-[var(--color-text-tertiary)] flex flex-col items-center gap-2">
                                <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                <span className="font-medium">Chart Visualization</span>
                            </div>
                        </div>

                        {/* Tabs Section */}
                        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                            <div className="flex border-b border-[var(--color-border)]">
                                {(['transactions', 'holders', 'info'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === tab
                                                ? 'text-[var(--color-shield-blue)]'
                                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        {activeTab === tab && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-shield-blue)]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="p-6 min-h-[200px]">
                                {activeTab === 'transactions' && (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">B</div>
                                                    <div>
                                                        <div className="text-sm font-medium text-[var(--color-text-primary)]">Buy</div>
                                                        <div className="text-xs text-[var(--color-text-tertiary)]">2 mins ago</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-medium text-[var(--color-success)]">+420 {token.symbol}</div>
                                                    <div className="text-xs text-[var(--color-text-tertiary)]">$1.76</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'holders' && (
                                    <div className="text-center text-[var(--color-text-secondary)] py-8">
                                        Top holders list coming soon
                                    </div>
                                )}
                                {activeTab === 'info' && (
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Description</h3>
                                            <p className="text-[var(--color-text-primary)] leading-relaxed">{token.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Owner</h3>
                                                <p className="text-[var(--color-text-primary)] font-mono text-sm truncate">{token.owner}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Charity Wallet</h3>
                                                <p className="text-[var(--color-text-primary)] font-mono text-sm truncate">{token.charityWallet}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Trade Interface */}
                    <div className="space-y-6">
                        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6">
                            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Swap</h2>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
                                    <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-2">
                                        <span>Pay</span>
                                        <span>Balance: 0.00 ETH</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <input
                                            type="text"
                                            placeholder="0.0"
                                            className="bg-transparent text-2xl font-bold text-[var(--color-text-primary)] outline-none w-full"
                                        />
                                        <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                                            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                                            <span className="font-medium text-[var(--color-text-primary)]">ETH</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center -my-2 relative z-10">
                                    <button className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-shield-blue)] transition-colors shadow-sm">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
                                    <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-2">
                                        <span>Receive</span>
                                        <span>Balance: 0.00 {token.symbol}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <input
                                            type="text"
                                            placeholder="0.0"
                                            className="bg-transparent text-2xl font-bold text-[var(--color-text-primary)] outline-none w-full"
                                        />
                                        <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}>
                                                {token.logoUrl || '🪙'}
                                            </div>
                                            <span className="font-medium text-[var(--color-text-primary)]">{token.symbol}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
                                    style={{ background: 'linear-gradient(135deg, var(--color-shield-blue) 0%, var(--color-shield-blue-dark) 100%)' }}
                                >
                                    Connect Wallet
                                </button>
                            </div>
                        </div>

                        {/* Token Info Card */}
                        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6">
                            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Tokenomics</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--color-text-secondary)]">Total Supply</span>
                                    <span className="font-medium text-[var(--color-text-primary)]">{token.totalSupply}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--color-text-secondary)]">Tax</span>
                                    <span className="font-medium text-[var(--color-text-primary)]">{token.transactionTax}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--color-text-secondary)]">Charity</span>
                                    <span className="font-medium text-[var(--color-success)]">{token.charityAllocation}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
