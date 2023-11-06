import React from "react";
import GetStarted from "@components/features/onboarding";
import { chatxbtHooks } from "../../chatxbt-sdk"
import ChatPage from "@components/features/chatbox/components/chat";

const Home = ({
  store: {
    connected
  },
}: any) => {
  return <>{connected ? <ChatPage /> : <GetStarted />}</>;
};

// export default Home;
const E = (props: any) => <Home {...chatxbtHooks.useAppEntry(props)} />
export default E;