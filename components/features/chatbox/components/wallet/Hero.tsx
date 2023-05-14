import React from "react";
import style from "@styles/chat/wallet.module.scss";
import { buttonData, userWalletData } from "./data";
import Card from "./Card";

const Hero = () => {
  return (
    <div className={style.hero}>
      <div id={style.details}>
        {userWalletData.map((data: any, index: any) => (
          <Card
            key={index}
            title={data.title}
            data={data.data}
            address={data.address}
          />
        ))}
      </div>

      <div id={style.buttons}>
        {buttonData.map((data: any, index: any) => (
          <div key={index} id={style.div}>
            <button>{data.icon}</button>
            <span>{data.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
