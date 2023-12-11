import React from 'react'
import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import ChatCardButtons from "./utils/ChatCardButtons";
import { BiRefresh } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import useCopyToClipboard from "@chatxbt-sdk/utils/copy-clipboard";
import * as IoIcons from "react-icons/io";
import * as IoIcons2 from "react-icons/io5";
import { formatAddress } from "@chatxbt-sdk/utils/formatter";

const ChatCardBridge = (props: any) => {
    const { metadata, dp, message } = props;
    const { isCopied, handleCopy, copiedData } = useCopyToClipboard();
  return (
    <motion.div
    className={style.chatCardWrapper}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  >
    <img src={dp} alt={"Bot Icon"} />

    <div className={style.chatCardWrapperMain}>
      {message && (
        <div
          className={`${style.chatCardSwapRow} ${style.chatCardRow}`}
          id={style.success}
        >
          <h2>{message && message.toUpperCase()}</h2>
        </div>
      )}

      <div className={`${style.chatCardSwapRow} ${style.chatCardRow}`}>
        <div>
          <h4>
            <span>Amount</span>
          </h4>
        </div>
        <div>
          <h4>{`${metadata.amount} ${metadata?.token.toUpperCase()}`}</h4>
        </div>
      </div>
      <div className={`${style.chatCardSwapRow} ${style.chatCardRow2}`}>
        <div id={style.one}>
          <h3>From</h3>
          <h5>
            {formatAddress(metadata.from, 10)}{" "}
            {isCopied && copiedData === metadata.from ? (
              <IoIcons2.IoCopy className={style.iconCopy} />
            ) : (
              <IoIcons2.IoCopyOutline
                className={style.iconCopy}
                onClick={() => handleCopy(metadata.from)}
              />
            )}
          </h5>
        </div>

        <div id={style.from}>
          <IoIcons2.IoArrowForwardOutline />
        </div>

        <div id={style.two}>
          <h3>To</h3>
          <h5>
            {formatAddress(metadata.to, 10)}{" "}
            {isCopied && copiedData === metadata.to ? (
              <IoIcons2.IoCopy className={style.iconCopy} />
            ) : (
              <IoIcons2.IoCopyOutline
                className={style.iconCopy}
                onClick={() => handleCopy(metadata.to)}
              />
            )}
          </h5>
        </div>
      </div>
      <div className={style.chatCardBtns}>
        <Link
          href={`https://goerli.etherscan.io/tx/${metadata.transactionHash}`}
        >
          <a target="_blank">
            <button type="button">
              View on block explorer{" "}
              <IoIcons2.IoOpenOutline className={style.iconCopy} />
            </button>
          </a>
        </Link>
      </div>
    </div>
  </motion.div>
  )
}

export default ChatCardBridge