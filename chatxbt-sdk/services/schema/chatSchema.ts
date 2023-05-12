import { useChatStore } from "@chatxbt-sdk/store/zustand/chat";
import { useRef } from "react";
import { useChatResolver } from "../hooks";

const useChatSchema = () => {
    const [message, setMessage] = useChatStore((state) => [state.chatMessage, state.updateMessage]);
    const preview = useChatStore((state) => state.preview);
    const submit = useChatStore((state) => state.sendMessage);
    const messages = useChatStore((state) => state.messages);
    const botResponse = useChatStore((state) => state.generateResponse);
    const status = useChatStore((state) => state.status);
    const botReply = useChatStore((state) => state.botReply);
    const resetMessage = useChatStore((state) => state.resetMessage);

    const { xbtResolve } = useChatResolver();

    const sendResponse = (message: string) => {
        botResponse(message)
    }

    const sendMessage = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!message.length) return;
        submit(message);
        const result = await xbtResolve(message);
        sendResponse(result);
    };

    const ref = useRef<null | HTMLDivElement>(null);

    return {
        constants: {
            message,
            preview,
            messages,
            status,
            ref,
            botReply
        },

        functions: {
            setMessage,
            sendMessage,
            sendResponse,
            botResponse,
            resetMessage
        }
    }
}

export default useChatSchema;