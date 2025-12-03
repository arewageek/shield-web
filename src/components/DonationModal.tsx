'use client';

import { useEffect, useState } from 'react';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    tokenName: string;
    charityWallet: string;
    donationAmount: string;
    onConfirm: () => void;
}

export default function DonationModal({
    isOpen,
    onClose,
    tokenName,
    charityWallet,
    donationAmount,
    onConfirm,
}: DonationModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 200);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'
                }`}
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Modal */}
            <div
                className={`relative w-full md:max-w-md bg-surface rounded-t-3xl md:rounded-3xl shadow-2xl ${isClosing ? 'animate-slide-down' : 'animate-slide-up'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Drag Handle (Mobile) */}
                <div className="md:hidden flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-[var(--border)] rounded-full"></div>
                </div>

                {/* Header */}
                <div className="px-6 pt-4 pb-3 border-b border-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Send Charity Donation
                        </h2>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--background)] transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center text-2xl">
                                💚
                            </div>
                            <div>
                                <div className="font-medium text-[var(--text-primary)]">{tokenName}</div>
                                <div className="text-sm text-[var(--text-secondary)]">Charity Token</div>
                            </div>
                        </div>

                        <div className="bg-[var(--background)] rounded-2xl p-4 space-y-3">
                            <div>
                                <label className="text-xs text-[var(--text-tertiary)] mb-1 block">
                                    Donation Amount
                                </label>
                                <div className="text-2xl font-bold text-shield-blue">
                                    {donationAmount}
                                </div>
                                <div className="text-xs text-[var(--text-secondary)] mt-1">
                                    Auto-filled from contract
                                </div>
                            </div>

                            <div className="pt-3 border-t border-border">
                                <label className="text-xs text-[var(--text-tertiary)] mb-1 block">
                                    Charity Wallet
                                </label>
                                <div className="font-mono text-sm text-[var(--text-primary)] break-all">
                                    {charityWallet}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-success-light dark:bg-success/10 border border-success/20 rounded-xl p-4 mb-6">
                        <div className="flex gap-2">
                            <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-success">
                                This will send the allocated charity funds directly from the token contract to the charity wallet.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            className="flex-1 px-6 py-3 rounded-full border border-border text-[var(--text-primary)] font-medium hover:bg-[var(--background)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-6 py-3 rounded-full bg-shield-blue text-white font-medium hover:bg-shield-blue-dark transition-colors active:scale-95"
                        >
                            Confirm Donation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
