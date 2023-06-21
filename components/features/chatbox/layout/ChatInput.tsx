import React from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/chat/layout.module.scss";
import * as IoIcons from "react-icons/io5";
import { useChat } from "@chatxbt-sdk/hooks";
import { motion } from "framer-motion";
import * as BsIcons from "react-icons/bs";

const ChatInput = (props: any) => {
  const {
    store: { message, hints, chatInputRef },
    action: { setMessage, sendMessage, addHint },
  } = props;
  console.log('props', props);
  return (
    <div className={style.chatInput}>
      {hints.length > 0 && (
        <motion.div
          className={style.hints}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          {hints.map((data: any, index: any) => (
            <div id={style.card} key={index}>
              <BsIcons.BsRobot id={style.icon} />
              <p onClick={() => addHint(data.prompt)}>{data.prompt}</p>
            </div>
          ))}
        </motion.div>
      )}

      <form>
        <div className={classInit.addConClass(style.con)}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            ref={chatInputRef}
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

// export default ChatInput;
export default (props: any) => <ChatInput {...useChat(props)} />
