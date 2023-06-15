import { useChatStore } from "@chatxbt-sdk/store/zustand/chat";
import { useRef } from "react";
import { useChatResolver } from "../hooks";
import { handleRefs, promptData } from "@chatxbt-sdk/utils";

const useChatSchema = () => {
    const [message, setMessage] = useChatStore((state) => [state.chatMessage, state.updateMessage]);
    const messageHolder = useChatStore((state) => state.messageHolder);
    const preview = useChatStore((state) => state.preview);
    const submit = useChatStore((state) => state.sendMessage);
    const messages = useChatStore((state) => state.messages);
    const botResponse = useChatStore((state) => state.generateResponse);
    const status = useChatStore((state) => state.status);
    const botReply = useChatStore((state) => state.botReply);
    const resetMessage = useChatStore((state) => state.resetMessage);
    const setPreview = useChatStore((state) => state.setPreview);

    const ref = useRef<null | HTMLDivElement>(null);
    const chatInputRef = useRef<null | HTMLInputElement>(null);

    const { xbtResolve } = useChatResolver();

    const sendResponse = (message: string) => {
        botResponse(message)
    }

    const addHint = (param: any) => {
        setMessage(param);
        handleRefs.default().handleChatInputFocus(chatInputRef);
    }

    const sendMessage = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!message.length) return;
        submit(message);
    };

    const connectResolver = async () => {
        const result = await xbtResolve(messageHolder);
        sendResponse(result);
    }

    const hints = promptData.default.AIPrompts
        .filter((word) => {
            const typedCommand = message.toLowerCase();
            const keyword = word.prompt.toLowerCase();
            return typedCommand && keyword.startsWith(typedCommand) && keyword !== typedCommand;
        }).slice(0, 10);
    
    const scrollDown = () => {
        handleRefs.default().scrollToLastChat(ref);
    };

    return {
        constants: {
            message,
            preview,
            messages,
            status,
            ref,
            chatInputRef,
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
            addHint,
            xbtResolve,
            connectResolver,
            scrollDown
        }
    }
}

export default useChatSchema;