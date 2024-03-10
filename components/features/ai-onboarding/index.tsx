import React from "react";
import Main from "./Main";
import GetStartedLayout from "@components/app-layout/layout/GetStartedLayout";

const AiOnboardingComponent = ({setOnboard}: any) => {
  return (
    <>
      {/* <GetStartedLayout> */}
        <Main setOnboard={setOnboard}/>
      {/* </GetStartedLayout> */}
    </>
  );
};

export default AiOnboardingComponent;
