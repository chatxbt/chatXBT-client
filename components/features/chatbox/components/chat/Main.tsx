import React, { useRef } from "react";
import style from "@styles/chat/chat.module.scss";
import Preview from "./Preview";
import { BotIndicator, UserChatCard } from "./ChatCard";
import * as MdIcons from "react-icons/md";
import { actionTypes } from "@chatxbt-sdk/config/constants";
import { useChat } from "@chatxbt-sdk/hooks";
import ChatCardBorrow from "./components/ChatCardBorrow";
import ChatCardLend from "./components/ChatCardLend";
import ChatCardStake from "./components/ChatCardStake";
import ChatCardSwap from "./components/ChatCardSwap";

const Main = (props: any) => {
  const {
    store: { preview, messages, status, ref },
    action: { scrollDown },
  } = useChat(props);

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
          <UserChatCard key={index} {...data} />
        ))}
      {status === actionTypes.PENDING && <BotIndicator />}
      <></>
    </div>
  );
};

export default Main;
// export default (props: any) => <Main {...useChat(props)} />
