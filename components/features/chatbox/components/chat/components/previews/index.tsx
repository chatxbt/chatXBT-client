import React from "react";
import SwapPreview from "./SwapPreview";
import BorrowPreview from "./BorrowPreview";
import BridgePreview from "./BridgePreview";
import { useChat } from "@chatxbt-sdk/hooks";

const AiActionPreview = (props: any) => {
  const {
    store: { confirmation },
    action: {}
  } = useChat(props);

  return (
    <>
      {confirmation?.type === "swap-preview" && (
        <SwapPreview {...confirmation} />
      )}
      {confirmation?.type === "borrow-preview" && <BorrowPreview />}
      {confirmation?.type === "bridge-preview" && <BridgePreview />}
    </>
  );
};

export default AiActionPreview;
