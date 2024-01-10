import React from "react";
import Image from "next/image";
import style from "@styles/chat/chat.module.scss";
import { motion } from "framer-motion";
import { actionTypes } from "@chatxbt-sdk/config/constants";
import TrendingCoins from "./components/TrendingCoins";
import CoinPrice from "./components/ChatCardPrice";
import {
  formatCurrency,
  formatNumberWithMagnitude,
} from "@chatxbt-sdk/utils/toolkit";
import ChatCardSwap from "./components/ChatCardSwap";
import ChatCardBorrow from "./components/ChatCardBorrow";
import ChatCardBridge from "./components/ChatCardBridge";

export const UserChatCard = (props: any) => {
  const { dp, from, id, message, type, metadata } = props;

  const highlightAtWords = (sentence: string) => {
    const words = sentence.split(" ");
    return words.map((word: any, index: any) =>
      word.startsWith("@") ? (
        <span key={index} style={{ color: "blue" }}>
          {word}{" "}
        </span>
      ) : (
        `${word} `
      )
    );
  };

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
            <p>{highlightAtWords(message)}</p>
          </div>
        </motion.div>
      )}

      {from === "bot" && (
        <>
          {type === actionTypes.DEFAULT_TEXT && (
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

          {type === actionTypes.CREATE_WALLET && (
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

          {type === actionTypes.BRIDGE && (
            <ChatCardBridge dp={dp} metadata={metadata} message={message} />
          )}

          {type === actionTypes.SWAP && (
            <ChatCardSwap dp={dp} metadata={metadata} message={message} />
          )}

          {type === actionTypes.BORROW && (
            <ChatCardBorrow dp={dp} metadata={metadata} message={message} />
          )}

          {type === actionTypes.APPROVAL && (
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

          {type === actionTypes.TRENDINGCOINS && (
            <TrendingCoins dp={dp} dummyCoins={metadata} />
          )}

          {type === actionTypes.COINPRICE && (
            <CoinPrice dp={dp} prices={metadata} />
          )}

          {type === actionTypes.TOTAL_MARKETCAP && (
            <motion.div
              className={style.chatCardBotMarketCap}
              id={`${id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <img src={dp} alt="" />

              <div className={style.message}>
                <h1>
                  {formatNumberWithMagnitude(metadata.total_market_cap.usd)}
                </h1>
                <p>
                  {`Today, the total market cap of the global cryptocurrency market stands at ${formatNumberWithMagnitude(
                    metadata.total_market_cap.usd
                  )}. 
                  The total market cap has experienced a ${metadata.market_cap_change_percentage_24h_usd.toFixed(
                    2
                  )}% change in the last 24 hours.
                  There are currently ${metadata.active_cryptocurrencies.toLocaleString()} active cryptocurrencies in the market, 
                  with ${metadata.ended_icos.toLocaleString()} ICOs having ended. 
                  The global market encompasses 922 markets, while ${metadata.ongoing_icos.toLocaleString()} ICOs are ongoing.`}
                </p>
              </div>
            </motion.div>
          )}

          {type === actionTypes.ERROR && (
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
