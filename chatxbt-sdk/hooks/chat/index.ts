import { chatxbtServices } from "../../index";
import { handleRefs } from "../../utils";
import { useEffect } from "react";

export const useChat = (props: any) => {
  const chatServices = chatxbtServices.chat(props);

  const {
    store: { status, ref, message, messages
    },
    action: { setPreview, handleUserInput,
    },
  } = chatServices;

  useEffect(() => {
    messages.length > 0 && setPreview(false);
  }, [messages]);

  useEffect(() => {
    handleRefs.default().scrollToLastChat(ref);
  }, [status]);

  useEffect(() => {
    handleUserInput();
  }, [message])

  return chatServices;
};
