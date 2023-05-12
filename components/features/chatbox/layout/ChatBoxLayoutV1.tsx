import React from "react";
import style from "@styles/chat/layout.module.scss";
import ChatBoxFooterNav from "./ChatBoxFooterNav";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxSidebar from "./ChatBoxSidebar";
import AppSeo from "@components/shared/seo";
import { seoImage } from "@chatxbt-sdk/utils/assets";

const ChatBoxLayoutV1 = ({ children }: any) => {
  return (
    <>
      <AppSeo
        title="Unlock a new experience with the power of AI and DeFi."
        description={`Trade, lend, stake, transfer, create multisigs, wallet, interact with protocols...Not with clicks, but with chat.`}
        image={seoImage.default}
      />
      <div className={style.chatLayoutV1}>
        <div className={style.sideBarPart}>
          <ChatBoxSidebar />
        </div>
        <div className={style.mainPage}>
          <ChatBoxHeader />
          <div className={style.body}>{children}</div>
        </div>
        <ChatBoxFooterNav />
      </div>
    </>
  );
};

export default ChatBoxLayoutV1;
