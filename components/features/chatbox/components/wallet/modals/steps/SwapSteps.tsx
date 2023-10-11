import React from "react";
import Image from "next/image";
import style from "@styles/chat/modal.module.scss";
import * as MdIcons from "react-icons/md";
import WalletAssets from "../assets/WalletAssets";
import { summaryData } from "../data";

const SwapSteps = ({ step, nextStep, goBack, closeModal }: any) => {
  switch (step) {
    case 0:
      return (
        <>
          <div className={style.header}>
            <h1>Swap from</h1>
            <button className={style.close} onClick={closeModal}>
              <MdIcons.MdOutlineClose />
            </button>
          </div>
          <form action="">
            <div className={style.group}>
              <input type="text" placeholder="Select asset" />
            </div>
            <label htmlFor="">To</label>
            <div className={style.group}>
              <input type="text" placeholder="Enter recipient address" />
            </div>
            <button onClick={nextStep}>Send</button>
          </form>
        </>
      );
    case 1:
      return (
        <>
          <div className={style.header}>
            <h1>Summary</h1>
            <button className={style.close} onClick={closeModal}>
              <MdIcons.MdOutlineClose />
            </button>
          </div>

          <div className={style.swapDetails}>
            <Image src="/images/main/swap.png" alt="" className={style.icon} />
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
            <button id={style.two} onClick={nextStep}>
              Confirm
            </button>
            <button id={style.one} onClick={goBack}>
              Cancel
            </button>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <div className={style.header}>
            <h1>Summary</h1>
            <button className={style.close} onClick={closeModal}>
              <MdIcons.MdOutlineClose />
            </button>
          </div>
          <div className={style.success}>
            <Image src="/images/main/success.png" alt="" />
            <p>
              You successfully swapped 0.041610435 ETH ($3.79) to
              0x76aF8...dv0072GA8Df8e4F{" "}
            </p>
          </div>
        </>
      );

    default:
      return (
        <>
          <div className={style.header}>
            <h1>Select asset to send</h1>
            <button className={style.close} onClick={closeModal}>
              <MdIcons.MdOutlineClose />
            </button>
          </div>
          <form action="">
            <div className={style.group}>
              <input type="text" placeholder="Select asset" />
            </div>
            <label htmlFor="">Recipient address</label>
            <div className={style.group}>
              <input type="text" placeholder="Enter recipient address" />
            </div>
            <label htmlFor="">Amount</label>
            <div className={style.group}>
              <input type="text" placeholder="0.00" />
            </div>
            <button>Send</button>
          </form>
        </>
      );
  }
};

export default SwapSteps;
