import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChatPage from "../dashboard/chat";

const DynamicPage = dynamic(
    async () => await import("@components/features/ai-onboarding"),
    { ssr: false }
  );

const OnboardingPage = () => {
  const [isOnboarded, setOnboarded] = useState(false);
  const setOnboard = (state: boolean) => {
    setOnboarded(state);
  }

  return (
    <>
      {isOnboarded ? <ChatPage /> : <DynamicPage setOnboard={setOnboard} />}
    </>
  )
}

export default OnboardingPage