import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import Overview from "./Overview";
import GetStartedNavPoints from "@components/app-layout/nav/GetStartedNavPoints";
import Tasks from "./Tasks";
import Footer from "@components/app-layout/footer";
import AppSeo from "@components/shared/seo";
import { seoImage } from "@chatxbt-sdk/utils/assets";

const TokenomicsComponent = () => {
  return (
    <>
      <AppSeo
        title="Unlock a new experience with the power of AI and DeFi."
        description={`Experience Chatxbt: Your gateway to DeFi rewards! Earn points by completing tasks and referring friends. Join us today!`}
        image={seoImage.default}
      />
      <div className={`container-fluid ${style.tokenomicsPage}`}>
        <div id={style.neon}></div>
        <GetStartedNavPoints />
        <Overview />
        <Tasks />
      </div>
      <Footer />
    </>
  );
};

export default TokenomicsComponent;
