import React from "react";
import ChatBoxLayoutV1 from "@components/features/chatbox/layout/ChatBoxLayoutV1";
import Main from "./Main";
import ComingSoon from "../ComingSoon";

const SettingsComponent = () => {
  return (
    <ChatBoxLayoutV1>
      <ComingSoon />
      {/* <Main /> */}
    </ChatBoxLayoutV1>
  );
};

export default SettingsComponent;
