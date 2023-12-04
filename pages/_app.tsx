import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/utils/global.scss";
import GoogleAnalytics from "../chatxbt-sdk/utils/google-analytics";
import PageLoadProgressIndicator from "@components/shared/nprogress";
import RainBow from "../components/hoc/rainbow";
import { Web3Modal } from "../components/hoc/web3modal";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { credentials } from "@chatxbt-sdk/config";

export const metadata = {
  title: "ChatXBT",
  description: "ChatXbt AI",
};

function MyApp({ Component, pageProps }: AppProps | any) {
  return (
    <>
      <PageLoadProgressIndicator>
        <Web3Modal>
          <GoogleOAuthProvider
            clientId={`${credentials.google.oauth.clientIdAuth}`}
          >
            <GoogleAnalytics />
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </Web3Modal>
      </PageLoadProgressIndicator>
    </>
  );
}

export default MyApp;
