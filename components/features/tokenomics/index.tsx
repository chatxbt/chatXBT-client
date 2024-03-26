import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import Overview from "./Overview";
import GetStartedNavPoints from "@components/app-layout/nav/GetStartedNavPoints";
import Tasks from "./Tasks";
import Footer from "@components/app-layout/footer";

const TokenomicsComponent = () => {
  return (
    <>
      <div className={`container-fluid ${style.tokenomicsPage}`}>
        <div id={style.neon}></div>
        <GetStartedNavPoints />
        <Overview />
        <Tasks />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default TokenomicsComponent;
