import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import { chatSchema } from "../../schema";

const useChat = () => {
    const chatServices = chatSchema.default();

    const {
        constants: { status, ref, messages },
        functions: { resetMessage, setPreview }
    } = chatServices;

    useEffect(() => {
        messages.length > 0 && setPreview(false);
    }, [messages]);

    useEffect(() => {
        if (status === 'Done') {
            handleRefs.default().scrollToLastChat(ref);
            let func = setTimeout(() => {
                resetMessage();
            }, 2000);

            return () => clearTimeout(func);
        };
    }, [status]);

    useEffect(() => {
        status === '' && handleRefs.default().scrollToLastChat(ref);
    }, [status]);

    return chatServices;
}

export default useChat;