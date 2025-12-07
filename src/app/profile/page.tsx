'use client';

import { mockTokens } from '@/lib/mockData';
import TokenCard from '@/components/TokenCard';
import { useState } from 'react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'tokens' | 'settings'>('tokens');

    // Mock User Data
    const user = {
        address: '0x71C...9A21',
        avatar: '👨‍🚀',
        reputation: 98,
        totalRaised: '$12,450',
        tokensLaunched: 3,
    };

    const myTokens = mockTokens.slice(0, 3); // Just taking first 3 for demo

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">My Profile</h1>

                {/* User Card */}
                <div className="relative overflow-hidden rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 md:p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-shield-blue)]/20 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-[var(--color-surface)] border-4 border-[var(--color-background)] shadow-xl flex items-center justify-center text-5xl">
                            {user.avatar}
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{user.address}</h2>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-shield-blue)]/10 text-[var(--color-shield-blue)] border border-[var(--color-shield-blue)]/20">
                                    Verified Creator
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--color-text-secondary)]">Reputation</span>
                                    <span className="font-bold text-[var(--color-success)]">{user.reputation}/100</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--color-text-secondary)]">Joined</span>
                                    <span className="font-medium text-[var(--color-text-primary)]">Dec 2024</span>
                                </div>
                            </div>
                        </div>

                        <button className="px-6 py-2.5 rounded-xl font-medium border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-background)] transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                        <div className="text-sm text-[var(--color-text-secondary)] mb-2">Total Raised</div>
                        <div className="text-3xl font-bold text-[var(--color-text-primary)]">{user.totalRaised}</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                        <div className="text-sm text-[var(--color-text-secondary)] mb-2">Tokens Launched</div>
                        <div className="text-3xl font-bold text-[var(--color-text-primary)]">{user.tokensLaunched}</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                        <div className="text-sm text-[var(--color-text-secondary)] mb-2">Donations</div>
                        <div className="text-3xl font-bold text-[var(--color-text-primary)]">142</div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="space-y-6">
                    <div className="flex border-b border-[var(--color-border)]">
                        <button
                            onClick={() => setActiveTab('tokens')}
                            className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'tokens'
                                    ? 'text-[var(--color-shield-blue)]'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            My Tokens
                            {activeTab === 'tokens' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-shield-blue)]" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'settings'
                                    ? 'text-[var(--color-shield-blue)]'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            Settings
                            {activeTab === 'settings' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-shield-blue)]" />
                            )}
                        </button>
                    </div>

                    {activeTab === 'tokens' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {myTokens.map((token) => (
                                <TokenCard key={token.id} token={token} />
                            ))}

                            {/* Create New Token Card */}
                            <button className="group rounded-2xl p-4 border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-shield-blue)] transition-colors flex flex-col items-center justify-center min-h-[200px] gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-secondary)] group-hover:text-[var(--color-shield-blue)] transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-shield-blue)] transition-colors">
                                    Launch New Token
                                </span>
                            </button>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="max-w-2xl space-y-6">
                            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-6">
                                <h3 className="font-semibold text-[var(--color-text-primary)]">Preferences</h3>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-[var(--color-text-primary)]">Email Notifications</div>
                                        <div className="text-sm text-[var(--color-text-secondary)]">Receive updates about your tokens</div>
                                    </div>
                                    <div className="w-11 h-6 bg-[var(--color-shield-blue)] rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-[var(--color-text-primary)]">Public Profile</div>
                                        <div className="text-sm text-[var(--color-text-secondary)]">Allow others to see your tokens</div>
                                    </div>
                                    <div className="w-11 h-6 bg-[var(--color-shield-blue)] rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
