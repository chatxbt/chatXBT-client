import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import ChatCardButtons from "./utils/ChatCardButtons";
import { BiRefresh } from "react-icons/bi";
import Image from "next/image";

const ChatCardSwap = (props: any) => {
  return (
    <motion.div
      className={style.chatCardWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div className={`${style.chatCardSwapRow} ${style.chatCardRow}`}>
        <div>
          <h2>Pay</h2>
          <h4>
            <Image src={"/images/chat/eth.png"} alt="right arrow" />
            <span>ETH</span>
          </h4>
          <h5>Balance: 20</h5>
        </div>
        <div>
          <h4>0.1 ETH</h4>
        </div>
      </div>
      <div
        className={`${style.chatCardSwapRow} ${style.chatCardRow}`}
        style={{ marginBottom: "8px" }}
      >
        <div>
          <h2>Receive</h2>
          <h4>
            <Image src={"/images/chat/eth.png"} alt="right arrow" />
            <span>PEPE</span>
          </h4>
          <h5>Balance: 0</h5>
        </div>
        <div>
          <h4>9,905,161.87 PEPE</h4>
          <h5>0x1e2a...1cd3</h5>
        </div>
        <span>
          <BiRefresh />
        </span>
      </div>

      <ChatCardButtons handleConfirm={() => {}} handleCancel={() => {}} />
    </motion.div>
  );
};

export default ChatCardSwap;
