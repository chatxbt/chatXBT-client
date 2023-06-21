import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import {
    chatxbtServices
} from "../../../chatxbt-sdk"

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