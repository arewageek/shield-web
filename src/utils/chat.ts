export const createMessage = (
    role: 'user' | 'agent',
    content: string
) => ({
    id: Date.now().toString(),
    role,
    content,
    timestamp: new Date(),
});

export const mapApiMessages = (data: any[]) =>
    data.map((msg) => ({
        id: msg._id,
        role: msg.sender === 'bot' ? 'agent' : 'user',
        content: msg.content,
        timestamp: new Date(msg.createdAt),
    }));
