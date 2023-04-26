import React from "react";
import style from "@styles/chat/layout.module.scss";
import ChatBoxFooterNav from "./ChatBoxFooterNav";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxSidebar from "./ChatBoxSidebar";
import ChatInput from "./ChatInput";
import { seoImage } from "@chatxbt-sdk/utils/assets";
import AppSeo from "@components/shared/seo";

const ChatBoxLayout = ({ children }: any) => {
  return (
    <>
      <AppSeo
        title="Unlock a new experience with the power of AI and DeFi."
        description={`Trade, lend, stake, transfer, create multisigs, wallet, interact with protocols...Not with clicks, but with chat.`}
        image={seoImage.default}
      />
      <div className={style.chatLayout}>
        <div className={style.sideBarPart}>
          <ChatBoxSidebar />
        </div>
        <div className={style.mainPage}>
          <ChatBoxHeader />
          <div className={style.body}>{children}</div>
          <ChatInput />
        </div>
        <ChatBoxFooterNav />
      </div>
    </>
  );
};

export default ChatBoxLayout;
