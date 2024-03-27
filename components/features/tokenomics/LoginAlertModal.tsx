import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";

const LoginAlertModal = ({ handleTaskModal }: any) => {
  return (
    <div className={style.modal}>
      <div className={style.taskModal}>
        <i onClick={handleTaskModal} id={style.close}>
          <MdClose />
        </i>
        <h3>Please Login</h3>
        <div className={style.notice}>
          <p>
            {`Welcome! To complete tasks or access features, you'll
            need to log in with X. Don't miss out on exciting
            opportunities – log in now and start exploring!`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAlertModal;
