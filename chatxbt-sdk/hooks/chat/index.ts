import { actionTypes } from "@chatxbt-sdk/config";
import { chatxbtServices } from "../../index";
import { handleRefs } from "../../utils";
import { useEffect, useState } from "react";

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

    const startTime: any = new Date();

    const stopResponseIfProlonged = setInterval(() => {

      const currentTime: any = new Date();

      const elapsedTime = (currentTime - startTime) / (1000 * 60); 

      if (status === actionTypes.PENDING && elapsedTime >= 5) {

        resetMessage();

        clearInterval(stopResponseIfProlonged);

      };

    }, 1000);

    return () => clearInterval(stopResponseIfProlonged);

  }, [status]);

  useEffect(() => {
    handleUserInput();
  }, [message])

  return chatServices;
};
