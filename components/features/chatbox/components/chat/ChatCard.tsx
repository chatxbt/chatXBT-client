import React from "react";
import style from "@styles/chat/chat.module.scss";
import { motion } from "framer-motion";
import { aiMessageTypes } from "@chatxbt-sdk/config/constants";

export const UserChatCard = (props: any) => {
  const { dp, from, id, message, type, metadata } = props;

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
        <>
          {type === aiMessageTypes.DEFAULT_TEXT && (
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

          {type === aiMessageTypes.CREATE_WALLET && (
            <motion.div
              className={style.chatCardBotWallet}
              id={`${id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <img src={dp} alt="" />

              <div className={style.message}>
                <div id={style.card}>
                  <h4>Address:</h4>
                  <p>{metadata?.address}</p>
                </div>
                <div id={style.card}>
                  <h4>mnemonic:</h4>
                  <div id={style.mne}>
                    {metadata?.mnemonic
                      .split(" ")
                      .map((data: any, index: any) => (
                        <span key={index}>{data}</span>
                      ))}
                  </div>
                </div>

                <h6>
                  {`Please keep these phrases safe, we cannot recover them for you
                  if you lose them.`}
                </h6>
              </div>
            </motion.div>
          )}

          {type === aiMessageTypes.SWAP && (
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

          {type === aiMessageTypes.APPROVAL && (
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

          {type === aiMessageTypes.ERROR && (
            <motion.div
              className={style.chatCardBotError}
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
