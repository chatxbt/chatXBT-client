import { multiStep } from "@chatxbt-sdk/utils";
import React from "react";
import style from "@styles/chat/modal.module.scss";
import ReceiveSteps from "./steps/ReceiveSteps";

const RecieveAssetModal = ({ closeModal }: any) => {
  const { step, nextStep, goBack } = multiStep.default();
  return (
    <div className={`container-fluid ${style.modal}`}>
      <div className={style.receiveAssetModal}>
        <ReceiveSteps
          step={step}
          nextStep={nextStep}
          goBack={goBack}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default RecieveAssetModal;
