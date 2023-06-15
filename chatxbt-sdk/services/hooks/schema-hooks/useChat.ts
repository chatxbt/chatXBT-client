import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import { chatSchema } from "../../schema";

const useChat = () => {
    const chatServices = chatSchema.default();

    const {
        constants: { status, ref, messages },
        functions: { setPreview }
    } = chatServices;

    useEffect(() => {
        messages.length > 0 && setPreview(false);
    }, [messages]);

    useEffect(() => {
        handleRefs.default().scrollToLastChat(ref);
    }, [status]);

    return chatServices;
}

export default useChat;