import React from "react";
import style from "@styles/chat/preview.module.scss";

const BridgePreview = () => {
  return (
    <div className={style.bridgePreviewCard}>
      <img src={"/images/chat/bot.png"} alt="" />
      <div className={style.messageContent}>
        <div className={style.message}>
          <p>Bridging 0.01 eth on polygon chain. Please confirm</p>
        </div>
        <div className={style.txDetails1}>
          <div className={style.header}>
            <h1>Summary</h1>
          </div>

          <div className={style.swapDetails}>
            {/* <img src="/images/main/swap.png" alt="" className={style.icon} /> */}
            <div className={style.cardOne}>
              <div>
                <h3>Etheruem Chain</h3>
                <h3>ETH</h3>
                <p>Balance: 20</p>
              </div>
              <h4>0.1</h4>
            </div>
            <div className={style.cardTwo}>
              <div>
                <h3>Polygon Chain</h3>
                <h3>ETH</h3>
                <p>Balance: 0</p>
              </div>
              <div>
                <h4>200</h4>
                <h6>0x1e2a...1cd3</h6>
              </div>
            </div>
          </div>

          <div className={style.liquid}>
            <h3>Gas fee</h3>
            <h5>$0.4234</h5>
          </div>
          <div className={style.buttons}>
            <button id={style.two}>Confirm</button>
            <button id={style.one}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgePreview;
