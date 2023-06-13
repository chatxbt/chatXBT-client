import React from "react";
import style from "@styles/chat/chat.module.scss";
import { motion } from "framer-motion";

export const UserChatCard = ({ dp, from, id, message }: any) => {
  return (
    <>
      {from === "user" && (
        <motion.div
          className={style.chatCard}
          id={`${id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <img src={dp} alt="" />

          <div className={style.message}>
            <p>{message}</p>
          </div>
        </motion.div>
      )}

      {from === "bot" && (
        <motion.div
          className={style.chatCardBot}
          id={`${id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <img src={dp} alt="" />

          <div className={style.message}>
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export const BotIndicator = () => {
  return (
    <>
      <div className={style.indicator}>
        <img src={`/images/chat/bot.png`} alt="" />
        <div className={style.message}>
          <div className={style.lds_ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
