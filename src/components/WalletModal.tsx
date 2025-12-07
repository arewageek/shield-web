'use client';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div
                className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] w-full max-w-md overflow-hidden shadow-2xl animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Connect Wallet</h2>
                    <button
                        onClick={onClose}
                        className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                        Choose your preferred wallet to connect to Shield.
                    </p>

                    {['Metamask', 'Coinbase Wallet', 'WalletConnect'].map((wallet) => (
                        <button
                            key={wallet}
                            onClick={onClose}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-shield-blue)] hover:bg-[var(--color-background)] transition-all group"
                        >
                            <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-shield-blue)]">{wallet}</span>
                            <div className="w-8 h-8 rounded-full bg-[var(--color-background)] group-hover:bg-white flex items-center justify-center">
                                {/* Placeholder icon */}
                                <div className="w-4 h-4 rounded-full bg-[var(--color-text-tertiary)] group-hover:bg-[var(--color-shield-blue)]" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose} />
        </div>
    );
}
