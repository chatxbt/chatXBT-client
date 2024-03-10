import React from "react";
import ChatBoxLayoutV1 from "@components/features/chatbox/layout/ChatBoxLayoutV1";
import Main from "./Main";
import ComingSoon from "../ComingSoon";

const ActivityComponent = () => {
  return (
    <ChatBoxLayoutV1>
      <div style={{ display: "flex" }}>
        <ComingSoon
          heading="Coming Soon"
          content="Activity Page enables you to see all your transaction activity with Chatxbt 
          { anything that's necessary for you to see as you're using Chatxbt to execute transactions  } "
        />
        <Main />
      </div>
    </ChatBoxLayoutV1>
  );
};

export default ActivityComponent;
