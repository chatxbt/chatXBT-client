import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import ChatCardRow from "./utils/ChatCardRow";
import ChatCardButtons from "./utils/ChatCardButtons";
import GasFee from "./utils/GasFee";

const ChatCardLend = () => {
  return (
    <motion.div
      className={style.chatCardWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <ChatCardRow
        icon={"/images/chat/eth.png"}
        symbol={"ETH"}
        quantity={0.38576}
        equivalent={233.0}
        balance={2.03}
      />
      <div className={style.chatCardRow}>
        <div>
          <h2>Supply APY</h2>
          <h4>
            <span style={{ color: "#058F58" }}>1.34%</span>
          </h4>
        </div>
        <div>
          <h4>Collateralization</h4>
          <h5>Enabled</h5>
        </div>
      </div>
      <GasFee amount={10} />

      <ChatCardButtons handleConfirm={() => {}} handleCancel={() => {}} />
    </motion.div>
  );
};

export default ChatCardLend;
