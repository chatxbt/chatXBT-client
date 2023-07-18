import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/utils/global.scss";
import GoogleAnalytics from "../chatxbt-sdk/utils/google-analytics";
import PageLoadProgressIndicator from "@components/shared/nprogress";
import RainBow from "../components/hoc/rainbow";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageLoadProgressIndicator>
        <RainBow>
          <GoogleAnalytics />
          <Component {...pageProps} />
        </RainBow>
      </PageLoadProgressIndicator>
    </>
  );
}

export default MyApp;
