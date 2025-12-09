interface MobileHeaderProps {
    tokenCount: number;
    onToggleTokens: () => void;
}

export default function MobileHeader({ tokenCount, onToggleTokens }: MobileHeaderProps) {
    return (
        <header
            className="md:hidden px-4 py-3 flex items-center justify-between"
            style={{ backgroundColor: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}
        >
            <span className="font-semibold">Chat</span>
            <button
                onClick={onToggleTokens}
                className="p-2 rounded-xl transition-colors relative hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <svg
                    className="w-6 h-6"
                    style={{ color: 'var(--color-text-primary)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {tokenCount > 0 && (
                    <span
                        className="absolute top-1 right-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-shield-blue)' }}
                    />
                )}
            </button>
        </header>
    );
}
