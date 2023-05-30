import React, { useState } from "react";
import style from "@styles/chat/modal.module.scss";
import { multiStep } from "@chatxbt-sdk/utils";
import SendSteps from "./steps/SendSteps";

const SendAssetModal = ({ closeModal }: any) => {
  const { step, nextStep, goBack } = multiStep.default();

  return (
    <div className={`container-fluid ${style.modal}`}>
      <div className={style.sendAssetModal}>
        <SendSteps
          step={step}
          nextStep={nextStep}
          goBack={goBack}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default SendAssetModal;
