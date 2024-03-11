import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChatPage from "../dashboard/chat";

const DynamicPage = dynamic(
    async () => await import("@components/features/ai-onboarding"),
    { ssr: false }
  );

const OnboardingPage = (props: any) => {
  const {
    store: { connected, userInfo},
  } = props;

  const [isOnboarded, setOnboarded] = useState(false);
  const setOnboard = (state: boolean) => {
    setOnboarded(state);
  }

  return (
    <>
      {userInfo?.displayName || isOnboarded ? <ChatPage /> : <DynamicPage setOnboard={setOnboard} />}
    </>
  )
}

export default OnboardingPage