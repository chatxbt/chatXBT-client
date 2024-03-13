import React from "react";
import style from "@styles/chat/chat.module.scss";
import { motion } from "framer-motion";

const Preview = () => {
  return (
    <motion.div
      className={style.preview}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <h1>Start by typing a prompt, or try entering one of these examples:</h1>
      <div className="row" id={style.row}>
        <div className="col-md-6">
          <div className={style.card}>
            <p>
              Add liquidity for me on <span>@uniswapv3</span>. Use a total of
              $500 from usdt and eth. Choose the default pool setting
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className={style.card}>
            <p>
              Bridge 1ETH from Polygon to Aptos use <span>@liquidswap</span>
            </p>
          </div>
        </div>
      </div>
      <div className="row" id={style.row}>
        <div className="col-md-6">
          <div className={style.card}>
            <p>Lend $1000 USDT on <span>@Compound</span> on ETH network</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className={style.card}>
            <p>
              Generate a bitcoin wallet address for me, use{" "}
              <span>@changenow</span> convert $200 ETH and fund the wallet
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preview;
