import { scrollToNewChat } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import { chatSchema } from "../../schema";

const useChat = () => {
    const chatServices = chatSchema.default();

    const {
        constants: { status, ref },
        functions: { resetMessage }
    } = chatServices;

    useEffect(() => {
        if (status === 'Done') {
            scrollToNewChat.default(ref);
            let func = setTimeout(() => {
                resetMessage()
            }, 2000);

            return () => clearTimeout(func);
        };
    }, [status]);

    useEffect(() => {
        status === '' && scrollToNewChat.default(ref);
    }, [status]);

    return chatServices;
}

export default useChat;