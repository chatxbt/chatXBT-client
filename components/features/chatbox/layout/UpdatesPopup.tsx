import React from "react";
import style from "@styles/chat/layout.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const UpdatesPopup = ({ closeModal }: any) => {
  return (
    <div
      className={`container-fluid ${style.updateModal}`}
      onClick={closeModal}
    >
      <motion.div
        className={style.updatePopup}
        initial={{ opacity: 0, y: 150, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      >
        <h1>Updates Coming Soon</h1>
        <p>
          🚀 Exciting updates are on the horizon for ChatXBT! Stay tuned as
          we prepare to unveil new features designed to elevate your DeFi
          experience. Get ready for a whole new level of possibilities! 🌟
        </p>
        <button onClick={closeModal}>Close</button>
      </motion.div>
    </div>
  );
};

export default UpdatesPopup;
