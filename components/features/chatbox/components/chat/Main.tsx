import React, { useRef } from "react";
import style from "@styles/chat/chat.module.scss";
import Preview from "./Preview";
import { BotIndicator, UserChatCard } from "./ChatCard";
import useChat from "@chatxbt-sdk/services/hooks/schema-hooks/useChat";
import * as MdIcons from "react-icons/md";

const Main = () => {
  const {
    constants: { preview, messages, status, ref },
    functions: { scrollDown },
  } = useChat();

  return (
    <div className={style.chatCon} ref={ref}>
      {messages.length > 10 && (
        <button className={style.down} onClick={scrollDown}>
          <MdIcons.MdKeyboardDoubleArrowDown />
        </button>
      )}
      {preview && <Preview />}
      {!preview &&
        messages.length > 0 &&
        messages?.map((data: any, index: any) => (
          <UserChatCard
            key={index}
            dp={data.dp}
            id={data.id}
            message={data.message}
            from={data.from}
          />
        ))}
      {status === "Sent" && <BotIndicator />}
    </div>
  );
};

export default Main;
