import { createConversation } from "./conversation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4444";

export const getUserId = () => {
    if (typeof window === 'undefined') return "demo-user"; // Fallback for server-side
    let user = localStorage.getItem("user");
    if (!user) {
        const newId = Date.now().toString();
        user = newId;
        localStorage.setItem("user", newId);
    }
    return user;
}

export const sendMessage = async (prompt: string) => {
    try {
        prompt = prompt.trim();
        if (!prompt) return;

        const user = getUserId();
        const conversationId = localStorage.getItem("conversationId");

        console.log({ user, prompt })

        const response = await fetch(`${API_URL}/chat/${conversationId}/message`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer demo`
            },
            body: JSON.stringify({
                message: prompt,
                sender: user
            }),
            method: 'POST'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || "Failed to send message");
        }

        const data = await response.json();

        return data;
    }
    catch (error: any) {
        console.log({ error: error.message })
        return { error: error.message }
    }
}
