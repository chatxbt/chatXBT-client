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
      userRefferals,
      setUserRefferal,
    } = useConnectionStore((state: any) => ({
      inAppWallet: state.inAppWallet,
      connected: state.connected,
      setInAppWallet: state.setInAppWallet,
      userInfo: state.userInfo,
      userRefferals: state.userRefferals,
      setUserRefferal: state.setUserRefferal,
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

        // get user wallet
        const getMyReferrals = async () => {
            try {
              const response = await chatxbtApi.getRefferals();
              const refferals = response?.data;
      
              if (refferals !== null) {
                setUserRefferal(refferals);
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
        userRefferals
      },
      action: {
        getMyReferrals,
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
