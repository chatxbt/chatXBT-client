import React from "react";
import style from "@styles/chat/preview.module.scss";
import { formatAddress } from "@chatxbt-sdk/utils/formatter";
import { useChat } from "@chatxbt-sdk/hooks";

const SwapPreview = (props: any) => {
  const {
    store: { confirmation },
    action: {
      awaitMessage
    }
  } = useChat(props);
  
  const {
    status,
    message,
    metadata
  } = confirmation;

  console.log(confirmation);

  // const confirmTx = eval(`${metadata?.confirm}`);

  const confirmSwap = metadata?.confirm;

  console.log(confirmSwap);

  return (
    <div className={style.swapPreviewCard}>
      <img src={"/images/chat/bot.png"} alt="" />
      <div className={style.messageContent}>
        <div className={style.message}>
          <p>{message}</p>
        </div>
        <div className={style.txDetails1}>
          <div className={style.header}>
            <h1>Swap Summary</h1>
          </div>

          <div className={style.swapDetails}>
            <img src="/images/main/swap.png" alt="" className={style.icon} />
            <div className={style.cardOne}>
              <div>
                <h3>Pay</h3>
                <h3>{metadata.fromToken}</h3>
                <p>Balance: 20</p>
              </div>
              <h4>{metadata.amount} {metadata.fromToken}</h4>
            </div>
            <div className={style.cardTwo}>
              <div>
                <h3>Receive</h3>
                <h3>{metadata.toToken}</h3>
                <p>Balance: 0</p>
              </div>
              <div>
                <h4>{metadata.amount}</h4>
                <h6>{formatAddress(metadata.address, 10)}</h6>
              </div>
            </div>
          </div>

          <div className={style.liquid}>
            <h3>Protocol</h3>
            <div>
              <span>{metadata?.protocol?.name}</span>
            </div>
          </div>
          <div className={style.liquid}>
            <h3>Gas fee</h3>
            <h5>$0.4234</h5>
          </div>
          <div className={style.buttons}>
            <button id={style.two} onClick={() => console.log('hello')}>Confirm</button>
            <button id={style.one}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapPreview;
