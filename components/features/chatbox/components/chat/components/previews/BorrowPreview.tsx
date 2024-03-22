import React from "react";
import style from "@styles/chat/preview.module.scss";

const BorrowPreview = () => {
  return (
    <div className={style.borrowPreviewCard}>
      <img src={"/images/chat/bot.png"} alt="" />
      <div className={style.messageContent}>
        <div className={style.message}>
          <p>Borrowing 0.01 eth for usdt @compound for you. Please confirm</p>
        </div>
        <div className={style.txDetails1}>
          <div className={style.header}>
            <h1>Summary</h1>
          </div>

          <div className={style.swapDetails}>
            {/* <img src="/images/main/swap.png" alt="" className={style.icon} /> */}
            <div className={style.cardOne}>
              <div>
                <h3>Pay</h3>
                <h3>ETH</h3>
                <p>Balance: 20</p>
              </div>
              <h4>0.1 ETH</h4>
            </div>
            <div className={style.cardTwo}>
              <div>
                <h3>Receive</h3>
                <h3>ETH</h3>
                <p>Balance: 0</p>
              </div>
              <div>
                <h4>9,905,161.87 PEPE</h4>
                <h6>0x1e2a...1cd3</h6>
              </div>
            </div>
          </div>

          <div className={style.liquid}>
            <h3>Liquidity provider</h3>
            <div>
              <span>Pancakeswap V1</span>
              <span>BiSwap</span>
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

export default BorrowPreview;
