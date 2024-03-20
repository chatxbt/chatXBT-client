import React from "react";
import style from "@styles/chat/wallet.module.scss";
import { buttonsData } from "./data";
import SendAssetModal from "./modals/SendAssetModal";
import RecieveAssetModal from "./modals/RecieveAssetModal";
import SwapModal from "./modals/SwapModal";
import buttonsHandlerSchema from "@chatxbt-sdk/utils/wallet-buttons-handler";

const Buttons = () => {
  const {
    status: { send, receive, swap, stake },
    actions: {
      handleSendModal,
      handleReceiveModal,
      handleSwapModal,
      handleStakeModal,
    },
  } = buttonsHandlerSchema();

  const { sendData, receiveData, swapData, stakeData } = buttonsData;
  return (
    <>
      {send && <SendAssetModal closeModal={handleSendModal} />}
      {receive && <RecieveAssetModal closeModal={handleReceiveModal} />}
      {swap && <SwapModal closeModal={handleSwapModal} />}

      <div id={style.buttons}>
        <div id={style.div}>
          <button onClick={handleSendModal}>
            <sendData.icon />
          </button>
          <span>{sendData.title}</span>
        </div>
        <div id={style.div}>
          <button onClick={handleReceiveModal}>
            <receiveData.icon />
          </button>
          <span>{receiveData.title}</span>
        </div>
        <div id={style.div}>
          <button onClick={handleSwapModal}>
            <swapData.icon />
          </button>
          <span>{swapData.title}</span>
        </div>
        <div id={style.div}>
          <button onClick={handleStakeModal}>
            <stakeData.icon />
          </button>
          <span>{stakeData.title}</span>
        </div>
      </div>
    </>
  );
};

export default Buttons;
