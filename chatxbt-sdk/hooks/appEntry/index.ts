import { useAccountEffect } from 'wagmi'
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
