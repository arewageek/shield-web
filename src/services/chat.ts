
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4444";

export const sendMessage = async (prompt: string) => {
    try {
        prompt = prompt.trim();
        if (!prompt) return;

        const response = await fetch(`${API_URL}/llm/prompt`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer demo`
            },
            body: JSON.stringify({
                prompt
            }),
            method: 'POST'
        })

        if (!response.ok) {
            throw new Error("Failed to send message");
        }

        const data = await response.json();
        return data;
    }
    catch (error: any) {
        console.log({ error: error.message })
        return { error: error.message }
    }
}