import React from "react";
import ChatBoxLayoutV1 from "@components/features/chatbox/layout/ChatBoxLayoutV1";
import Main from "./Main";
import ComingSoon from "../ComingSoon";

const WalletComponent = () => {
  return (
    <ChatBoxLayoutV1>
      <div style={{ display: "flex" }}>
        <ComingSoon
          heading="Coming Soon"
          content="Wallet enables you to perform transactions and manage your crypto agnostic wallets for your trade"
        />
        <Main />
      </div>
    </ChatBoxLayoutV1>
  );
};

export default WalletComponent;
