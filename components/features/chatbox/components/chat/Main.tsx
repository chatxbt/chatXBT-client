import React from "react";
import style from "@styles/chat/chat.module.scss";
import Preview from "./Preview";
import { BotIndicator, UserChatCard } from "./ChatCard";
import * as MdIcons from "react-icons/md";
import { actionTypes } from "@chatxbt-sdk/config/constants";
import { useChat } from "@chatxbt-sdk/hooks";
import BackToBottomButton from "@components/shared/back-to-bottom";

const Main = (props: any) => {
  const {
    store: { preview, messages, status, ref, scroll },
    action: { scrollDown, rePrompt },
  } = useChat(props);

  return (
    <div className={style.chatCon} ref={ref}>
      {status === actionTypes.DONE && scroll && (
        <BackToBottomButton onClick={scrollDown} />
      )}

      {/* {messages.length > 0 && (
        <button
          className={style.rePrompt}
          onClick={rePrompt}
          disabled={status === actionTypes.PENDING}
        >
          <MdIcons.MdOutlineRefresh id={style.icon} />
          Re-prompt
        </button>
      )} */}

      {preview && <Preview />}

      {!preview &&
        messages.length > 0 &&
        messages?.map((data: any, index: any) => (
          <UserChatCard key={index} {...data} />
        ))}

      {status === actionTypes.PENDING && <BotIndicator />}
    </div>
  );
};

export default Main;
// export default (props: any) => <Main {...useChat(props)} />
