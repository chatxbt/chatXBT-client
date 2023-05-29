import React from "react";
import style from "@styles/chat/wallet.module.scss";
import { userWalletData } from "./data";
import Card from "./Card";
import Buttons from "./Buttons";

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

      <Buttons />
    </div>
  );
};

export default Hero;
