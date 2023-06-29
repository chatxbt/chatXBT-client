import { useEffect, useState } from "react";
import GetStarted from "./get-started";
import { useConnectionStore } from "@chatxbt-sdk/store/zustand/connection";
import ChatPage from "./dashboard/chat";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ChatPageView = dynamic(() => import("./dashboard/chat"), {
  loading: () => <ChatPage />,
});

const Home = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const { connected, visibleAddress } = useConnectionStore();
  useEffect(() => {
    setIsConnected(connected);
  }, [connected]);
  useEffect(() => {
    isConnected && router.push("/dashboard/chat");
  }, [isConnected]);

  return <GetStarted />;
};

export default Home;
