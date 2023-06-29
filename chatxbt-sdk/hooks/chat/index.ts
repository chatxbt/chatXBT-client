import { chatxbtServices } from "@chatxbt-sdk/index";
import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";

export const useChat = (props: any) => {
    const chatServices = chatxbtServices.chat(props);

    const {
        store: { 
            status, 
            ref, 
            messages 
        },
        action: { 
            resetMessage, 
            setPreview, 
            connectResolver 
        }
    } = chatServices;

    useEffect(() => {
        messages.length > 0 && setPreview(false);
    }, [messages]);

    useEffect(() => {
        handleRefs.default().scrollToLastChat(ref);
    }, [status]);

    return chatServices;
}