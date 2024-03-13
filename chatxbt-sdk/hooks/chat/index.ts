import { actionTypes } from "@chatxbt-sdk/config";
import { chatxbtServices } from "../../index";
import { handleRefs } from "../../utils";
import { useEffect } from "react";

export const useChat = (props: any) => {
  const chatServices = chatxbtServices.chat(props);

  const {
    store: { status, ref, message, messages
    },
    action: { setPreview, handleUserInput, resetMessage
    },
  } = chatServices;

  useEffect(() => {
    messages.length > 0 && setPreview(false);
  }, [messages]);

  useEffect(() => {
    handleRefs.default().scrollToLastChat(ref);
  }, [status]);

  useEffect(() => {

    const stopResponseIfProlonged = setTimeout(() => {

      status === actionTypes.PENDING && resetMessage();

    }, 5 * 60 * 1000);

    return () => clearTimeout(stopResponseIfProlonged);

  }, [status]);

  useEffect(() => {
    handleUserInput();
  }, [message])

  return chatServices;
};
