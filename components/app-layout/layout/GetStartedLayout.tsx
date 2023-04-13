import { seoImage } from "@chatxbt-sdk/utils/assets";
import AppSeo from "@components/shared/seo";
import Stars from "@components/shared/stars";
import React from "react";
import style from "@styles/layout/index.module.scss";
import GetStartedNav from "../nav/GetStartedNav";

const GetStartedLayout = ({ children }: any) => {
  return (
    <>
      <AppSeo
        title="The ChatGPT for Defi."
        description={`Experience the fusion of decentralized finance and AI.`}
        image={seoImage.default}
      />
      <div className={style.getStartedLayout}>
        <div id={style.ellipse1}></div>
        <div id={style.ellipse2}></div>
        <div id={style.ellipse3}></div>
        <Stars />
        <GetStartedNav />
        {children}
      </div>
    </>
  );
};

export default GetStartedLayout;
