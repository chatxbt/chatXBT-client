import React from "react";
import Hero from "./Hero";
import style from "@styles/chat/wallet.module.scss";
import Body from "./Body";

const Main = () => {
  return (
    <div className={style.walletCon}>
      <Hero />
      <Body />
    </div>
  );
};

export default Main;
