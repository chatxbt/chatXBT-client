//@ts-ignore
import { chatxbtDataProvider, chatxbtStore, chatxbtUtils } from "../..";
import { useRouter } from 'next/router'

export const user = (props: any) => {
  try {
    const router = useRouter()

    // data provider modules
    const { chatxbtApi } = chatxbtDataProvider;

    // store module
    const { useConnectionStore } =
      chatxbtStore.zustandStore;

    // connection store
    const {
      inAppWallet,
      connected,
      setInAppWallet,
      userInfo,
    } = useConnectionStore((state: any) => ({
      inAppWallet: state.inAppWallet,
      connected: state.connected,
      setInAppWallet: state.setInAppWallet,
      userInfo: state.userInfo,
    }));

    // get user wallet
    const getWallet = async () => {
      try {
        const response = await chatxbtApi.getWallet();
        const wallet = response?.data;

        if (wallet) {
          setInAppWallet(wallet);
        }

      } catch (error: any) {
        console.log(error);
      }
    }


    return {
      store: {
        connected,
        inAppWallet,
        userInfo,
      },
      action: {
        getWallet,
        setInAppWallet
      },
      ...props,
    };
  } catch (error: any) {
    if (error?.response?.status === 500 || error?.response?.status === 403)
      chatxbtUtils.toolkit.slackNotify({
        message: JSON.stringify(error?.response?.message),
      });
  }
};
