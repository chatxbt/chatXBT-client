import React from "react";
import SwapPreview from "./SwapPreview";
import BorrowPreview from "./BorrowPreview";
import BridgePreview from "./BridgePreview";
import { useChat } from "@chatxbt-sdk/hooks";

const AiActionPreview = (props: any) => {
  const {
    store: { confirmation },
    action: {},
  } = useChat(props);

  const txConf = JSON.parse(confirmation);

  return (
    <>
      {txConf?.type === "swap-preview" && <SwapPreview />}
      {txConf?.type === "borrow-preview" && <BorrowPreview />}
      {txConf?.type === "bridge-preview" && <BridgePreview />}
    </>
  );
};

export default AiActionPreview;
