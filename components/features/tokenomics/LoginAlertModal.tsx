import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

const LoginAlertModal = ({ handleTaskModal, openLoginModal }: any) => {
  const listTwo = {
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    hidden: { opacity: 0 },
  };
  return (
    <div className={style.modal}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ type: "linear" }}
        variants={listTwo}
        className={`${style.taskModal} ${
          openLoginModal ? style.show : style.hide
        }`}
      >
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
      </motion.div>
    </div>
  );
};

export default LoginAlertModal;
