import { useEffect, useState } from "react";
import GetStarted from "./get-started";
import { useConnectionStore } from "@chatxbt-sdk/store/zustand/connection";
import { chatxbtHooks, chatxbtUtils } from "../chatxbt-sdk"
import ChatPage from "./dashboard/chat";
import dynamic from "next/dynamic";

// Window?.addEventListener('error', function (event) {
//   // Handle the error here
//   console.error('Client-side exception:', event.error);
// });

// const ChatPageView = dynamic(() => import("./dashboard/chat"), {
//   loading: () => <ChatPage />,
// });

const Home = ({
  store: {
    connected
  },
}: any) => {
  // const [isConnected, setIsConnected] = useState(false);
  // const { connected, visibleAddress } = useConnectionStore();
  // useEffect(() => {
  //   setIsConnected(connected)
  // }, [connected]);

  // console.log('intentTemplate', chatxbtUtils.intents);
  return <>{connected ? <ChatPage /> : <GetStarted />}</>;
};

// export default Home;
export default (props: any) => <Home {...chatxbtHooks.useAppEntry(props)} />
