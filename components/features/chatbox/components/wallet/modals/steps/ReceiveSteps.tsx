import React from "react";
import Image from "next/image";
import style from "@styles/chat/modal.module.scss";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import WalletAssets from "../assets/WalletAssets";

const ReceiveSteps = ({ step, nextStep, goBack, closeModal }: any) => {
  switch (step) {
    case 0:
      return (
        <WalletAssets
          nextStep={nextStep}
          closeModal={closeModal}
          title="Select asset to receive"
        />
      );
    case 1:
      return (
        <>
          <h1>Share Payment Request</h1>
          <div className={style.qr}></div>
          <div className={style.addSection}>
            <h4>Wallet Address: 0x27e27e2...27</h4>
            <RiIcons.RiFileCopyFill id={style.icon} />
          </div>
          <button onClick={closeModal}>Done</button>
        </>
      );
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
              You successfully sent 0.041610435 ETH ($3.79) to
              0x76aF8...dv0072GA8Df8e4F{" "}
            </p>
          </div>
        </>
      );

    default:
      return (
        <WalletAssets
          nextStep={nextStep}
          closeModal={closeModal}
          title="Select asset to receive"
        />
      );
  }
};

export default ReceiveSteps;
