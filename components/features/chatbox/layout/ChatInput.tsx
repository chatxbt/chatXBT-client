import React from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/chat/layout.module.scss";
import * as IoIcons from "react-icons/io5";
import useChat from "@chatxbt-sdk/services/hooks/controllers/useChat";

const ChatInput = () => {
  const {
    constants: { message, hints },
    functions: { setMessage, sendMessage, addHint },
  } = useChat();

  return (
    <div className={style.chatInput}>
      {hints.length > 0 && (
        <div className={style.hints}>
          {hints.map((data: any, index: any) => (
              <p key={index} onClick={() => addHint(data.keyword)}>{data.keyword}</p>
            ))}
        </div>
      )}

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
