import React, { useEffect, useState } from "react";
import { chatxbtServices } from "@chatxbt-sdk/index";
import MainPage from "./MainPage";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { envConfig } from "@chatxbt-sdk/config";
import WaitlistLayout from "@components/app-layout/layout/WaitlistLayout";

const WaitlistComponent = () => {
  const handleVerify = (token: any) => {
    localStorage.setItem("capToken", token);
  };

  return (
    <WaitlistLayout>
      <GoogleReCaptchaProvider
        reCaptchaKey={envConfig.default.captchaPublicKey}
        language="eng"
        useRecaptchaNet={true}
        useEnterprise={false}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
        container={{
          element: undefined,
          parameters: {
            theme: "dark",
          },
        }}
      >
        <GoogleReCaptcha onVerify={(token) => handleVerify(token)} />
        <MainPage {...chatxbtServices.appSchema.joinSchema.default()} />
      </GoogleReCaptchaProvider>
    </WaitlistLayout>
  );
};

export default WaitlistComponent;
