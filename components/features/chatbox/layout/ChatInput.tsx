import React from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/chat/layout.module.scss";
import * as IoIcons from "react-icons/io5";
import useChat from "@chatxbt-sdk/services/hooks/controllers/useChat";
import { useChatStore } from "@chatxbt-sdk/store/zustand/chat";
import { useChatResolver } from "@chatxbt-sdk/services/hooks";
// import

const ChatInput = () => {
  const { chatMessage } = useChatStore();
  const { xbtResolve } = useChatResolver();
  const {
    constants: { message },
    functions: { setMessage, sendMessage, sendResponse },
  } = useChat();

  const resolveMessage = async (e: any) => {
    sendMessage(e);
    const result = await xbtResolve(chatMessage);
    sendResponse(result);
  };

  return (
    <div className={style.chatInput}>
      <form onSubmit={(e: any) => e.preventDefault()}>
        <div className={classInit.addConClass(style.con)}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={resolveMessage}>
            <IoIcons.IoPaperPlaneOutline />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
