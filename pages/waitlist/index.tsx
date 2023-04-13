import React from "react";
import dynamic from "next/dynamic";
import AppSeo from "@components/shared/seo";
import { seoImage } from "@chatxbt-sdk/utils/assets";

const DynamicPage = dynamic(
  async () => await import("@components/features/waitlist"),
  { ssr: false }
);

const WaitlistPage = () => {
  return (
    <>
      <AppSeo
        title="The ChatGPT for Defi."
        description={`Experience the fusion of decentralized finance and AI.`}
        image={seoImage.default}
      />
      <DynamicPage />
    </>
  );
};

export default WaitlistPage;
