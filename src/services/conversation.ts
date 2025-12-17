import { API_URL } from "@/app/config";
import { getUserId } from "./chat";

export const getConversationId = async () => {
    let conversationId = localStorage.getItem("conversationId");
    if (!conversationId) {
        const conversation = await createConversation()
        localStorage.setItem("conversationId", conversation.data._id);
    }
    return localStorage.getItem("conversationId");
}

export const createConversation = async () => {
    const user = getUserId()
    if (!user) return;

    const response = await fetch(`${API_URL}/chat/conversation`, {
        headers: {
            "Authorization": `Bearer demo`
        },
        method: "POST",
        body: JSON.stringify({
            user
        })
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Failed to create conversation");
    }
    const data = await response.json();

    console.log({ data })

    return data;
}

export const conversations = async () => {
    const user = getUserId()
    if (!user) return;

    const response = await fetch(`${API_URL}/chat/conversations`, {
        headers: {
            "Authorization": `Bearer demo`
        },
        method: "GET"
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Failed to fetch conversations");
    }

    const data = await response.json();
    return data;
}

export const conversation = async () => {
    const user = getUserId()
    if (!user) return;

    const conversationId = await getConversationId()

    const response = await fetch(`${API_URL}/chat/conversation/${conversationId}`, {
        headers: {
            "Authorization": `Bearer demo`
        },
        method: "GET"
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Failed to fetch conversation");
    }

    const data = await response.json();
    return data;
}