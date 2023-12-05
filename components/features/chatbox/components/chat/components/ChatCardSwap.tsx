import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import ChatCardButtons from "./utils/ChatCardButtons";
import { BiRefresh } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

const ChatCardSwap = (props: any) => {
  console.log(props);
  const { metadata, dp, message } = props;
  return (
    <motion.div
      className={style.chatCardWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <img src={dp} alt={"Bot Icon"} />

      <div className={style.chatCardWrapperMain}>
        <div
          className={`${style.chatCardSwapRow} ${style.chatCardRow}`}
          id={style.success}
        >
          <h2>{message}</h2>
        </div>
        <div className={`${style.chatCardSwapRow} ${style.chatCardRow}`}>
          <div>
            <h4>
              <span>Amount</span>
            </h4>
          </div>
          <div>
            <h4>0.1 ETH</h4>
          </div>
        </div>
        <div className={`${style.chatCardSwapRow} ${style.chatCardRow}`}>
          <div>
            <h2>From</h2>
            <h5>{metadata.from}</h5>
          </div>
        </div>
        <div className={`${style.chatCardSwapRow} ${style.chatCardRow}`}>
          <div>
            <h2>To</h2>
            <h5>{metadata.to}</h5>
          </div>
        </div>
        <div className={style.chatCardBtns}>
          <Link
            href={`https://goerli.etherscan.io/tx/${metadata.transactionHash}`}
          >
            <a target="_blank">
              <button type="button">View on block explorer</button>
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCardSwap;
