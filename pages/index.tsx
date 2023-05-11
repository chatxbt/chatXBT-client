import { useEffect, useState } from "react";
import GetStarted from "./get-started";
import { useConnectionStore } from "@chatxbt-sdk/store/zustand/connection";
import ChatPage from "./dashboard/chat";
import dynamic from "next/dynamic";

const ChatPageView = dynamic(() => import("./dashboard/chat"), {
  loading: () => <ChatPage />,
});

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { connected, visibleAddress } = useConnectionStore();
  useEffect(() => {
    setIsConnected(connected)
  }, [connected]);
  return <>{isConnected ? <ChatPageView /> : <GetStarted />}</>;
};

export default Home;
