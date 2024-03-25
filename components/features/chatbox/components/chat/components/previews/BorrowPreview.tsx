import React from "react";
import style from "@styles/chat/preview.module.scss";
import { useChat } from "@chatxbt-sdk/hooks";
import { formatAddress } from "@chatxbt-sdk/utils/formatter";

const BorrowPreview = (props: any) => {
  const {
    store: { confirmation },
    action: { initTxAndConfirm, cancelTx },
  } = useChat(props);

  const txConf = JSON.parse(confirmation);

  const { args, message, data, contractConfig, dex } = txConf;

  return (
    <div className={style.borrowPreviewCard}>
      <img src={"/images/chat/bot.png"} alt="" />
      <div className={style.messageContent}>
        <div className={style.message}>
        <p>{message}</p>
        </div>
        <div className={style.txDetails1}>
          <div className={style.header}>
            <h1>Borrow Summary</h1>
          </div>

          <div className={style.swapDetails}>
            {/* <img src="/images/main/swap.png" alt="" className={style.icon} /> */}
            <div className={style.cardOne}>
              <div>
                <h3>Pay</h3>
                <h2>{args?.fromToken}</h2>
              </div>
              <h4>{data?.Amount} {args?.fromToken}</h4>
            </div>
            <div className={style.cardTwo}>
              <div>
                <h3>Receive</h3>
                <h2>{args?.toToken}</h2>
              </div>
              <div>
              <h4>{data?.amount}</h4>
                <h6>{formatAddress(contractConfig?.signer?.address, 10)}</h6>
              </div>
            </div>
          </div>

          <div className={style.liquid}>
            <h3>Protocol</h3>
            <div>
            <span>{dex}</span>
            </div>
          </div>
          <div className={style.buttons}>
            <button id={style.two} onClick={initTxAndConfirm}>
              Confirm
            </button>
            <button id={style.one} onClick={cancelTx}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowPreview;
