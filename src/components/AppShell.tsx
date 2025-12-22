'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Sidenav from './Sidenav';
import { UIProvider, useUI } from '@/context/UIContext';
import sdk from '@farcaster/miniapp-sdk';

function AppShellContent({ children }: { children: ReactNode }) {
    const { isSidenavOpen, closeSidenav, openSidenav } = useUI();
    const pathname = usePathname();

    // Determine title based on path
    const getTitle = () => {
        if (pathname === '/') return 'Shield';
        if (pathname.startsWith('/tokens')) return 'Explore Tokens';
        if (pathname.startsWith('/profile')) return 'Profile';
        return 'Shield';
    };

    return (
        <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Sidenav */}
            <Sidenav isOpen={isSidenavOpen} onClose={closeSidenav} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="px-4 py-4 md:px-6 md:hidden" style={{ backgroundColor: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={openSidenav}
                                className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}>
                                S
                            </div>
                            <div>
                                <h1 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                    {getTitle()}
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                {children}
            </main>
        </div>
    );
}

export default function AppShell({ children }: { children: ReactNode }) {
    useEffect(() => {
        sdk.actions.ready();
    }, []);
    
    return (
        <UIProvider>
            <AppShellContent>{children}</AppShellContent>
        </UIProvider>
    );
}
