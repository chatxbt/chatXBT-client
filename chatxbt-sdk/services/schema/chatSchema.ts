import { useChatStore } from "@chatxbt-sdk/store/zustand/chat";
import { useRef } from "react";

export default () => {
    const [message, setMessage] = useChatStore((state) => [state.chatMessage, state.updateMessage]);
    const preview = useChatStore((state) => state.preview);
    const submit = useChatStore((state) => state.sendMessage);
    const messages = useChatStore((state) => state.messages);
    const botResponse = useChatStore((state) => state.generateResponse);
    const status = useChatStore((state) => state.status);
    const botReply = useChatStore((state) => state.botReply);

    const sendMessage = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!message.length) return;
        submit(message);
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
            botResponse
        }
    }
}