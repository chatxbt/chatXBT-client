import { useChatStore } from "@chatxbt-sdk/store/zustand/chat";
import { useRef } from "react";
import { useChatResolver } from "../hooks";
import { promptData } from "@chatxbt-sdk/utils";

const useChatSchema = () => {
    const [message, setMessage] = useChatStore((state) => [state.chatMessage, state.updateMessage]);
    const preview = useChatStore((state) => state.preview);
    const submit = useChatStore((state) => state.sendMessage);
    const messages = useChatStore((state) => state.messages);
    const botResponse = useChatStore((state) => state.generateResponse);
    const status = useChatStore((state) => state.status);
    const botReply = useChatStore((state) => state.botReply);
    const resetMessage = useChatStore((state) => state.resetMessage);
    const setPreview = useChatStore((state) => state.setPreview);


    const { xbtResolve } = useChatResolver();

    const sendResponse = (message: string) => {
        botResponse(message)
    }

    const addHint = (param: any) => {
        setMessage(param);
    }

    const sendMessage = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!message.length) return;
        submit(message);
        const result = await xbtResolve(message);
        sendResponse(result);
    };

    const ref = useRef<null | HTMLDivElement>(null);

    const hints = promptData.default.AIPrompts
        .filter((word) => {
            const typedCommand = message.toLowerCase();
            const keyword = word.prompt.toLowerCase();
            return typedCommand && keyword.startsWith(typedCommand) && keyword !== typedCommand;
        }).slice(0, 10);

    return {
        constants: {
            message,
            preview,
            messages,
            status,
            ref,
            botReply,
            hints
        },

        functions: {
            setMessage,
            sendMessage,
            sendResponse,
            botResponse,
            resetMessage,
            setPreview,
            addHint
        }
    }
}

export default useChatSchema;