import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/utils/global.scss";
import GoogleAnalytics from "../chatxbt-sdk/utils/google-analytics";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <GoogleAnalytics/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
