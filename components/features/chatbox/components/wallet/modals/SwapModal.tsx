import React from 'react'
import style from "@styles/chat/modal.module.scss";
import { multiStep } from '@chatxbt-sdk/utils';
import SwapSteps from './steps/SwapSteps';

const SwapModal = ({ closeModal }: any) => {
  const { step, nextStep, goBack } = multiStep.default();
  return (
    <div className={`container-fluid ${style.modal}`}>
      <div className={style.swapAssetModal}>
        <SwapSteps
          step={step}
          nextStep={nextStep}
          goBack={goBack}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
}

export default SwapModal