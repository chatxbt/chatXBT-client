import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import { chatxbtServices } from "../../../chatxbt-sdk";

export const useAppEntry = (props: any) => {
  try {
    const authService = chatxbtServices.auth(props);
    const defiService = chatxbtServices.defi(props);
    const {
      store: { _hasHydrated, wagmiData, variables, signMessageData, connected, googleLogin },
      action: { handleWalletSignIn, signAndConnectUser, signOut },
    } = authService;

    const {
      store: { configured, lightPool },
      action: { loadLightPoolAndInitialiseNlpCoreConfigs },
    } = defiService;

    useEffect(() => {
      //   alert(wagmiData.address);
      !connected &&
        _hasHydrated &&
        wagmiData.isConnected &&
        wagmiData.address &&
        handleWalletSignIn(wagmiData.address);
    }, [wagmiData.isConnected, wagmiData.address]);

    useEffect(() => {
      // localStorage.clear();
      // connected && props.history.push('/chat');
      // !connected && props.history.push('/');
      // signOut();
      !configured && connected && loadLightPoolAndInitialiseNlpCoreConfigs();
    }, [connected]);

    useEffect(() => {
      // localStorage.clear();
      wagmiData?.isDisconnected && signOut();
    }, [wagmiData?.isDisconnected]);

    useEffect(() => {
      (async () => {
        if (variables?.message && signMessageData) {
          // const recoveredAddress = await recoverMessageAddress({
          //   message: variables?.message,
          //   signature: signMessageData,
          // })
          // setRecoveredAddress(recoveredAddress)
          await signAndConnectUser(wagmiData.address);
        }
      })();
    }, [signMessageData, variables?.message]);

    return {
      store: {
        connected,
        googleLogin,
      },
      action: {
        loadLightPoolAndInitialiseNlpCoreConfigs,
      },
    };
  } catch (error) {}
};
