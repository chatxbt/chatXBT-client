import React from "react";
import Image from "next/image";
import style from "@styles/chat/modal.module.scss";
import * as MdIcons from "react-icons/md";
import { summaryData } from "../data";
import WalletAssets from "../assets/WalletAssets";

const SendSteps = ({ step, nextStep, goBack, closeModal }: any) => {
  switch (step) {
    case 0:
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
            <button onClick={nextStep}>Send</button>
          </form>
        </>
      );
    case 1:
      return (
        <WalletAssets
          nextStep={nextStep}
          closeModal={closeModal}
          title="Select asset"
        />
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

          <div className={style.summaryDiv}>
            {summaryData.map((data: any, index: any) => (
              <div id={style.card} key={index}>
                <p>{data.title}</p>
                <h4>{data.data}</h4>
              </div>
            ))}
          </div>
          <div className={style.maxDiv}>
            <div id={style.card}>
              <p>Max Amount (Amount + gas fee)</p>
              <h4> $3,003.79</h4>
            </div>
          </div>
          <div className={style.buttons}>
            <button id={style.one} onClick={goBack}>
              Cancel
            </button>
            <button id={style.two} onClick={nextStep}>
              Confirm
            </button>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <div className={style.header}>
            <h1>Summary</h1>
            <button className={style.close} onClick={closeModal}>
              <MdIcons.MdOutlineClose />
            </button>
          </div>
          <div className={style.success}>
            <img src="/images/main/success.png" alt="" />
            <p>
              You successfully sent 0.041610435 ETH ($3.79) to
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

export default SendSteps;
