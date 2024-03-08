import React from "react";
import ChatBoxLayoutV1 from "@components/features/chatbox/layout/ChatBoxLayoutV1";
import Main from "./Main";
import Activity from "./activity";
import ComingSoon from "../ComingSoon";

const ActivityComponent = () => {
  return (
    <ChatBoxLayoutV1>
      {/* <ComingSoon /> */}
      {/* <Main /> */}
      <Activity />
    </ChatBoxLayoutV1>
  );
};

export default ActivityComponent;
