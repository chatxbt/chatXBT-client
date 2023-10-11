import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import ChatCardButtons from "./utils/ChatCardButtons";
import GasFee from "./utils/GasFee";
import Image from "next/image";

const ChatCardStake = () => {
  return (
    <motion.div
      className={style.chatCardWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div className={style.chatCardRow}>
        <div>
          <h4>Available to stake</h4>
          <h2>
            <Image
              src={"/images/chat/eth.png"}
              alt="ETH"
              width={16}
              height={16}
            />
            <span>0.38576 ETH</span>
          </h2>
          <h5>~ $233.00 USD</h5>
        </div>

        <div>
          <aside>
            <span>0x1e2a...1cd3423</span>
            <div></div>
          </aside>
        </div>

        {/*  */}
      </div>
      <div className={style.chatCardRow}>
        <div>
          <h4>Staked amount</h4>
          <h2>
            <Image
              src={"/images/chat/eth.png"}
              alt="ETH"
              width={16}
              height={16}
            />
            <span>0.38576 ETH</span>
          </h2>
          <h5>~ $233.00 USD</h5>
        </div>
        <div>
          <h4>Lido APY</h4>
          <h5 style={{ color: "#058F58" }}>~3.34</h5>
        </div>
      </div>
      {/*  */}
      <GasFee amount={10} />
      {/*  */}
      <ChatCardButtons handleConfirm={() => {}} handleCancel={() => {}} />
      {/*  */}
    </motion.div>
  );
};

export default ChatCardStake;
