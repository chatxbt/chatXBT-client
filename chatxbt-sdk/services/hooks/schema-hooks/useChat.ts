import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import { chatSchema } from "../../schema";

const useChat = () => {
    const chatServices = chatSchema.default();

    const {
        constants: { status, ref, messages },
        functions: { resetMessage, setPreview, connectResolver }
    } = chatServices;

    useEffect(() => {
        messages.length > 0 && setPreview(false);
    }, [messages]);

    useEffect(() => {
        if (status === 'Sent') {
            handleRefs.default().scrollToLastChat(ref);
            let func = setTimeout(() => {
                connectResolver();
                resetMessage();
            }, 2000);

            return () => clearTimeout(func);
        };
    }, [status]);

    useEffect(() => {
        handleRefs.default().scrollToLastChat(ref);
    }, [status]);

    return chatServices;
}

export default useChat;