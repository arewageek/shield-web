import ChatInput from './ChatInput';

interface ChatInputAreaProps {
    inputText: string;
    isTyping: boolean;
    onSend: (message: string) => void;
    onInputChange: (text: string) => void;
    onWalletClick: () => void;
}

export default function ChatInputArea({
    inputText,
    isTyping,
    onSend,
    onInputChange,
    onWalletClick
}: ChatInputAreaProps) {
    return (
        <div
            className="px-4 md:px-6 pb-safe md:pb-4"
            style={{ backgroundColor: 'var(--color-surface)', borderTop: `1px solid var(--color-border)` }}
        >
            <div className="max-w-3xl mx-auto flex items-end gap-3">
                {!inputText.trim() && (
                    <button
                        type="button"
                        onClick={onWalletClick}
                        className="flex-shrink-0 w-12 h-12 mb-1 rounded-full text-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-shield-blue) 0%, var(--color-shield-blue-dark) 100%)',
                            boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)'
                        }}
                        aria-label="Connect Wallet"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                        <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                )}
                <div className="flex-1">
                    <ChatInput
                        onSend={(msg) => {
                            onSend(msg);
                            onInputChange('');
                        }}
                        onInputChange={onInputChange}
                        disabled={isTyping}
                    />
                </div>
            </div>
        </div>
    );
}
