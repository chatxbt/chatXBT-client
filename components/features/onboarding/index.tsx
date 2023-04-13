import React from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/get-started/index.module.scss";
import GetStartedLayout from "@components/app-layout/layout/GetStartedLayout";
import Main from "./Main";

const OnboardingComponent = () => {
  return (
    <>
      <GetStartedLayout>
        <div className={classInit.addConClass(style.getStartedCon)}>
          <Main />
        </div>
      </GetStartedLayout>
    </>
  );
};

export default OnboardingComponent;
