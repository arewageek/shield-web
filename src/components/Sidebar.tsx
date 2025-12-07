'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/' || pathname === '/chat';
        }
        return pathname.startsWith(path);
    };

    const navItems = [
        {
            name: 'Chat',
            path: '/',
            icon: (isActive: boolean) => (
                <svg className="w-6 h-6" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 0 : 2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            name: 'Tokens',
            path: '/tokens',
            icon: (isActive: boolean) => (
                <svg className="w-6 h-6" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 0 : 2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: (isActive: boolean) => (
                <svg className="w-6 h-6" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 0 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0" style={{ backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}>
            {/* Header */}
            <div className="p-6 flex items-center gap-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}>
                    S
                </div>
                <span className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Shield</span>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            style={{ color: active ? 'var(--color-shield-blue)' : 'var(--color-text-secondary)' }}
                        >
                            {item.icon(active)}
                            <span className={`font-medium ${active ? 'font-semibold' : ''}`}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Info */}
            <div className="p-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                <p className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>
                    © 2024 Shield Token Bot
                </p>
            </div>
        </aside>
    );
}
