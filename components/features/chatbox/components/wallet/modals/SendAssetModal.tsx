import React from "react";
import style from "@styles/chat/modal.module.scss";
import * as MdIcons from "react-icons/md";

const SendAssetModal = ({ closeModal }: any) => {
  return (
    <div className={style.modal}>
      <div className={style.sendAssetModal}>
        <div className={style.header}>
          <h1>Select asset to send</h1>
          <button className={style.close} onClick={closeModal}>
            <MdIcons.MdOutlineClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendAssetModal;
