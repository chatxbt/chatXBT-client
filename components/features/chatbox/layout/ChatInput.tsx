import React from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/chat/layout.module.scss";
import * as IoIcons from "react-icons/io5";
import { useChat } from "@chatxbt-sdk/hooks";
import { motion } from "framer-motion";
import * as BsIcons from "react-icons/bs";

const ChatInput = (props: any) => {
  const {
    store: { message, hints, chatInputRef, showSuggestions, suggestions },
    action: {
      setMessage,
      sendMessage,
      addHint,
      handleSuggestionClick,
      handleBlur,
    },
  } = useChat(props);

  return (
    <div className={style.chatInput}>
      {hints?.length > 0 && (
        <motion.div
          className={style.hints}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          {hints.map((data: any, index: any) => (
            <div
              id={style.card}
              key={index}
              onClick={() => addHint(data.prompt)}
            >
              <BsIcons.BsRobot id={style.icon} />
              <p>{data.prompt}</p>
            </div>
          ))}
        </motion.div>
      )}

      {showSuggestions && suggestions?.length > 0 && (
        <motion.ul
          className={style.hints}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          {suggestions.map((data: any, index: any) => {
            return (
              <li
                id={style.card}
                key={index}
                onClick={() => handleSuggestionClick(data)}
              >
                <BsIcons.BsRobot id={style.icon} />
                <p>{data}</p>
              </li>
            );
          })}
        </motion.ul>
      )}

      <form>
        <div className={classInit.addConClass(style.con)}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            ref={chatInputRef}
            onChange={(e) => setMessage(e.target.value)}
            // onBlur={handleBlur}
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
// export default (props: any) => <ChatInput {...useChat(props)} />
