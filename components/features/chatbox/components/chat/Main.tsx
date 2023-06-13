import React, { useRef } from "react";
import style from "@styles/chat/chat.module.scss";
import Preview from "./Preview";
import { BotIndicator, UserChatCard } from "./ChatCard";
import useChat from "@chatxbt-sdk/services/hooks/controllers/useChat";

const Main = () => {
  const {
    constants: { preview, messages, status, ref },
    functions: {},
  } = useChat();

  return (
    <div className={style.chatCon} ref={ref}>
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
