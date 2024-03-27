import React from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/get-started/index.module.scss";
import GetStartedLayout from "@components/app-layout/layout/GetStartedLayout";
import Main from "./Main";
import AppSeo from "@components/shared/seo";
import { seoImage } from "@chatxbt-sdk/utils/assets";

const OnboardingComponent = (props: any) => {
  return (
    <>
      <AppSeo
        title="Unlock a new experience with the power of AI and DeFi."
        description={`Trade, lend, stake, transfer, create multisigs, wallet, interact with protocols...Not with clicks, but with chat.`}
        image={seoImage.default}
      />
      <GetStartedLayout>
        <div className={classInit.addConClass(style.getStartedCon)}>
          <Main {...props} />
        </div>
      </GetStartedLayout>
    </>
  );
};

export default OnboardingComponent;
