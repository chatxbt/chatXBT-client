import React from 'react'
import dynamic from "next/dynamic";

const DynamicPage = dynamic(
    async () => await import("@components/features/ai-onboarding"),
    { ssr: false }
  );

const OnboardingPage = () => {
  return (
    <>
    <DynamicPage />
  </>
  )
}

export default OnboardingPage