import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/utils/global.scss";
import GoogleAnalytics from "../chatxbt-sdk/utils/google-analytics";
import PageLoadProgressIndicator from "@components/shared/nprogress";
// import RainBow from "../components/hoc/rainbow";
// import { Web3Modal } from "../components/hoc/web3modal";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { credentials } from "@chatxbt-sdk/config";
import Web3RootLayout from '../components/hoc/web3modal'

// import type { Metadata } from 'next'
// import { headers } from 'next/headers'



function MyApp({ Component, pageProps }: AppProps | any) {
  return (
    <>
      <PageLoadProgressIndicator>
        <Web3RootLayout>
          <GoogleOAuthProvider
            clientId={`${credentials.google.oauth.clientIdAuth}`}
          >
            <GoogleAnalytics />
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </Web3RootLayout>
      </PageLoadProgressIndicator>
    </>
  );
}

export default MyApp;
