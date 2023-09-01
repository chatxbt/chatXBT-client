import style from "@styles/chat/layout.module.scss";
import ChatBoxFooterNav from "./ChatBoxFooterNav";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxSidebar from "./ChatBoxSidebar";
import ChatInput from "./ChatInput";
import { seoImage } from "@chatxbt-sdk/utils/assets";
import AppSeo from "@components/shared/seo";
import { useChat } from "@chatxbt-sdk/hooks";
import { useEffect, useRef } from "react";

const ChatBoxLayout = ({ children }: any) => {
  const {
    store: {},
    action: { setScroll },
  } = useChat(null);

  const ref = useRef<null | HTMLDivElement>(null);

  const handleScroll = () => {
    if (ref.current != null) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      scrollTop + clientHeight === scrollHeight
        ? setScroll(false)
        : setScroll(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current != null) {
      const el = ref.current;
      el.addEventListener("scroll", handleScroll);
      return () => {
        el.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

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
          <div className={style.body} ref={ref}>
            {children}
          </div>
          <ChatInput />
        </div>
        <ChatBoxFooterNav />
      </div>
    </>
  );
};

export default ChatBoxLayout;
