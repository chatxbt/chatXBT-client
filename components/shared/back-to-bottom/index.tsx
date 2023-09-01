import React from "react";
import * as MdIcons from "react-icons/md";
import style from "@styles/chat/chat.module.scss";
import { motion } from "framer-motion";

const BackToBottomButton = ({ onClick }: any) => {
  return (
    <>
      <motion.button
        className={style.down}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      >
        <MdIcons.MdKeyboardDoubleArrowDown />
      </motion.button>
    </>
  );
};

export default BackToBottomButton;
