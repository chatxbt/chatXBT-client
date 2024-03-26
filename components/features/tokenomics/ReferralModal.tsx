import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";

const ReferralModal = ({ handleTaskModal }: any) => {
  return (
    <div className={style.modal}>
      <div className={style.taskModal}>
        <i onClick={handleTaskModal} id={style.close}>
          <MdClose />
        </i>
        <h3>Share referral link</h3>
        <div className={style.notice}>
          <ul>
            <li>
              <p>
                You get 50 points for each referral as well as the person
                referred
              </p>
            </li>
            <li>
              <p>
                If the person referred, refers another person you get 15 points
              </p>
            </li>
          </ul>
        </div>
          <button id={style.copy}>Copy Referral Link</button>
      </div>
    </div>
  );
};

export default ReferralModal;
