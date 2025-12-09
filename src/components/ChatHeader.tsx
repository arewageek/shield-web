export default function ChatHeader() {
    return (
        <div
            className="hidden md:block px-4 py-4 md:px-6"
            style={{ backgroundColor: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: 'linear-gradient(135deg, var(--color-shield-blue-light) 0%, var(--color-shield-blue-dark) 100%)' }}
                    >
                        S
                    </div>
                    <div>
                        <h1 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Shield
                        </h1>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                            AI Charity Token Creator
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
