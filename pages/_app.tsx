import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/utils/global.scss";
import GoogleAnalytics from "../chatxbt-sdk/utils/google-analytics";
import PageLoadProgressIndicator from "@components/shared/nprogress";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageLoadProgressIndicator>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </PageLoadProgressIndicator>
    </>
  );
}

export default MyApp;
