import { useAccountEffect } from 'wagmi'
import { useRouter } from 'next/router'
import { handleRefs } from "../../utils";
import { useEffect } from "react";
import { chatxbtServices, chatxbtConfig } from "../../../chatxbt-sdk";

export const useAppEntry = (props: any) => {
  try {
    const authService = chatxbtServices.auth(props);
    const defiService = chatxbtServices.defi(props);
    const {
      store: { _hasHydrated, wagmiData, variables, signMessageData, connected, googleLogin, userInfo },
      action: { handleWalletSignIn, signAndConnectUser, signOut, checkUserNetwork, connect },
    } = authService;

    const {
      store: { configured, lightPool },
      action: { loadLightPoolAndInitialiseNlpCoreConfigs },
    } = defiService;

    useAccountEffect({
      onConnect(data) {
        !connected && data.address && handleWalletSignIn(data.address);
      },
      onDisconnect() {
        connected && signOut('wagmi is disconnected');
      },
    })


    // useEffect(() => {
    //   //   alert(wagmiData.address);
    //   // alert(connected);
    //     // _hasHydrated &&
    //     !connected &&
    //     wagmiData.isConnected &&
    //     wagmiData.address &&
    //     handleWalletSignIn(wagmiData.address);
    // }, [wagmiData.isConnected, wagmiData.address]);

    useEffect(() => {
      // localStorage.clear();
      // connected && props.history.push('/chat');
      // !connected && props.history.push('/');
      // signOut();
      // !configured && connected && loadLightPoolAndInitialiseNlpCoreConfigs();
      connected && loadLightPoolAndInitialiseNlpCoreConfigs();
    }, [connected]);

    // useEffect(() => {
    //   checkUserNetwork();
    // }, [wagmiData.isConnected, wagmiData.address]);

    useEffect(() => {
      (async () => {
        if (variables?.message && signMessageData) {
          // const recoveredAddress = await recoverMessageAddress({
          //   message: variables?.message,
          //   signature: signMessageData,
          // })
          // setRecoveredAddress(recoveredAddress)
          wagmiData.address && await signAndConnectUser(wagmiData.address);
        }
      })();
    }, [signMessageData, variables?.message, wagmiData.address]);

    // useEffect(() => {
    //   // localStorage.clear();
    //   !wagmiData.address && wagmiData?.isDisconnected && signOut('wagmi is disconnected');
    // }, [wagmiData?.isDisconnected]);

    return {
      store: {
        connected,
        googleLogin,
        userInfo
      },
      action: {
        loadLightPoolAndInitialiseNlpCoreConfigs,
      },
    };
  } catch (error) { }
};


export const useGamifyAppEntry = (props: any) => {
  try {
    const router = useRouter();
    const authService = chatxbtServices.auth(props);
    const userService = chatxbtServices.user(props);

    const {
      store: { _hasHydrated, twitterAuth, connected, userInfo },
      action: {
        getTwitterAccess,
        handleTwitterAuth 
      }
    } = authService;

    const {
      store: {
        inAppWallet,
      },
      action: {
        getWallet
      }
    } = userService;

    useEffect(() => {
      console.log('inAppWallet?.assets', inAppWallet?.assets);
      // get wallet
      connected && !inAppWallet?.assets && getWallet();
    }, [connected]);

    useEffect(() => {
      // getTwitterAccess();
    }, []);

    useEffect(() => {

      const { oauth_verifier, oauth_token }: any = router.query;

      !connected && twitterAuth?.oauth_token_secret && oauth_verifier && handleTwitterAuth(JSON.stringify({
        oauth_token,
        oauth_token_secret: twitterAuth?.oauth_token_secret,
        oauth_verifier,
      }));

    }, [router.query]);

    return {
      store: {
        connected,
        userInfo
      },
      action: {
        getTwitterAccess
      },
    };
  } catch (error) { }
};