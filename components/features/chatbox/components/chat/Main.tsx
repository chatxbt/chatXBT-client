import React, { useRef } from "react";
import style from "@styles/chat/chat.module.scss";
import Preview from "./Preview";
import { BotIndicator, UserChatCard } from "./ChatCard";
import { useChat } from "@chatxbt-sdk/hooks";
import * as MdIcons from "react-icons/md";

const Main = (props: any) => {
  const {
    store: { preview, messages, status, ref },
    action: { scrollDown },
  } = props

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

// export default Main;
export default (props: any) => <Main {...useChat(props)} />
