import React from "react";
import Image from "next/image";
import style from "@styles/get-started/index.module.scss";
import { icons } from "./data";
import { motion } from "framer-motion";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const RainBow = () => {
  return <ConnectButton/>;
};

const GetStarted = ({ handleEmail, handleMeta }: any) => {
  return (
    <motion.div
      className={style.init}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <h1>Get started</h1>
      <h3>Welcome to ChatXBT - Where AI meets Defi</h3>

      {/* <div className={style.socials}>
        <p>Sign Up with socials:</p>
        <div>
          {icons.map((data: any, index: any) => (
            <img src={data} alt="" key={index} />
          ))}
        </div>
        <button onClick={handleEmail}>Sign up with email</button>
      </div>

      <h4>OR</h4> */}

      <div className={style.wallets}>
        <RainBow/>
        {/* <button onClick={handleMeta}>
          <img src="/images/get-started/meta.png" alt="" />
          <p>Metamask</p>
        </button>
        <button>
          <img src="/images/get-started/connect.png" alt="" />
          <p>Wallet Connect</p>
        </button>
        <button>
          <img src="/images/get-started/trust.png" alt="" />
          <p>Trust Wallet</p>
        </button> */}
      </div>
    </motion.div>
  );
};

export default GetStarted;
