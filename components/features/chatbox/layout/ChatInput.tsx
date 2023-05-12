import React from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/chat/layout.module.scss";
import * as IoIcons from "react-icons/io5";
import useChat from "@chatxbt-sdk/services/hooks/controllers/useChat";

const ChatInput = () => {
  const {
    constants: { message },
    functions: { setMessage, sendMessage },
  } = useChat();

  return (
    <div className={style.chatInput}>
      <form>
        <div className={classInit.addConClass(style.con)}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>
            <IoIcons.IoPaperPlaneOutline />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
