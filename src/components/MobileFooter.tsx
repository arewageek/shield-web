'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileFooter() {
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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border safe-area-inset-bottom">
            <div className="flex items-center justify-around px-4 py-3">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${active
                                    ? 'text-shield-blue'
                                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            {item.icon(active)}
                            <span className="text-xs font-medium">{item.name}</span>
                            {active && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-shield-blue rounded-full"></div>
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
