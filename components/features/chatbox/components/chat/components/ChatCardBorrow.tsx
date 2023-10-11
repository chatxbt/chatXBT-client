import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import ChatCardRow from "./utils/ChatCardRow";
import ChatCardButtons from "./utils/ChatCardButtons";
import GasFee from "./utils/GasFee";
import Image from "next/image";

const ChatCardBorrow = (props: any) => {
  // simulating error
  const error = {
    message: "There was an error. Please try again later!",
  };
  // const error = false;

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
          <h2>Health factor</h2>
          <h4>
            <Image src={"/images/chat/ArrowRight.svg"} alt="right arrow" />
            <span style={{ color: error ? "#D63252" : "#058F58" }}>1.34</span>
          </h4>
        </div>
        <div>
          <h4>Liquidation at</h4>
          <h5>&lt;1.0</h5>
        </div>
      </div>

      <GasFee amount={12} />

      {error && (
        <p className={style.chatErrorMsg}>
          <Image src="/images/chat/Warning.png" alt="warning" />
          <span>
            {error?.message ||
              "Borrowing this amount will reduce your health factor and increase risk of liquidation"}
          </span>
        </p>
      )}

      <ChatCardButtons handleConfirm={() => {}} handleCancel={() => {}} />
    </motion.div>
  );
};

export default ChatCardBorrow;
