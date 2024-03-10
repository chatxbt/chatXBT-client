//@ts-ignore
import { randomBytes } from "crypto";
// import Web3 from "web3";
import { useCallback, useMemo } from "react";
import { ethers } from "ethers";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { recoverMessageAddress } from "viem";
import { chatxbtDataProvider, chatxbtStore, chatxbtUtils } from "../..";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const auth = (props: any) => {
  try {
    const { disconnect: walletDisconnect } = useDisconnect();
    const wagmiData = useAccount();
    const {
      data: signMessageData,
      error: wgmE,
      // isLoading,
      signMessage: wgsm,
      variables,
      signMessageAsync,
    } = useSignMessage();

    // data provider modules
    const { chatxbtApi } = chatxbtDataProvider;

    // store module
    const { useConnectionStore, utilityAndConfigStore, useWaitlistStore } =
      chatxbtStore.zustandStore;

    // connection store
    const {
      signature,
      connected,
      address,
      provider,
      visibleAddress,
      _hasHydrated,
      signMessage,
      connect,
      disconnect,
      userInfo
    } = useConnectionStore((state: any) => ({
      signature: state.signature,
      connected: state.connected,
      address: state.address,
      provider: state.provider,
      visibleAddress: state.visibleAddress,
      _hasHydrated: state._hasHydrated,
      signMessage: state.signMessage,
      connect: state.connect,
      disconnect: state.disconnect,
      userInfo: state.userInfo
    }));

    // waitlist store
    const {
      email,
      message,
      error,
      loading,
      // function
      updateEmail,
      submitEmail,
      closeMessage,
      closeError,
    } = useWaitlistStore((state: any) => ({
      email: state.email,
      message: state.message,
      error: state.error,
      loading: state.loading,
      // function
      updateEmail: state.updateEmail,
      submitEmail: state.sendEmail,
      closeMessage: state.clearMessage,
      closeError: state.clearError,
    }));

    // app utility and configuration store
    const { setMessage, startLoading, stopALoadingProccess } =
      utilityAndConfigStore((state: any) => ({
        setMessage: state.setMessage,
        startLoading: state.startLoading,
        stopALoadingProccess: state.stopALoadingProccess,
      }));

    const sendFormValid = !email?.length;

    // get signer
    const getSigner = async (provider: any, account: string) => {
      try {
        const signer = provider.getSigner(account);
        // @ts-ignore
        const signature = await window.ethereum.request({
          // @ts-ignore
          method: "personal_sign",
          params: [
            // @ts-ignore
            `Verify Your Address ${account} Request Key: ${randomBytes(
              16
            ).toString("hex")}`,
            account,
          ],
        });

        return { signer, signature, address: ethers.getAddress(account) };
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });
        throw new chatxbtUtils.Issue(500, error?.message);
      }
    };

    const signAndConnectUser = async (address: string) => {
      try {
        const res = await chatxbtApi.getWalletJwt({
          address,
          signature: `${signMessageData}`,
        });

        const jwt = res?.data.token;
        const user = res?.data;

        if (jwt) {
          connect(
            user,
            jwt,
            wagmiData.address,
            signMessageData,
            wagmiData.connector?.id
          );
        }

        if (!jwt) {
          walletDisconnect();
          throw new chatxbtUtils.Issue(401, res.message);
        }
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });
        walletDisconnect();
      }
    };

    const handleWalletSignIn = async (address: string) => {
      try {
        const response = await chatxbtApi.getMessageToSign({
          address,
        });
        const messageToSign = response?.data;
        if (!messageToSign) {
          walletDisconnect();
          throw new chatxbtUtils.Issue(401, response.message);
        }

        // const web3 = new Web3(Web3.givenProvider);
        // const signature = await web3.eth.personal.sign(messageToSign, address, '');
        wgsm({ message: messageToSign });
        // const signature = await web3.eth.sign(messageToSign, address);
      } catch (error: any) {
        alert(error.message);
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });
        walletDisconnect();
        // throw new chatxbtUtils.Issue(500, error.message)
        // toast.success("You have successfully signed in");
      }
    };

    //wallet sign in [depreciated] 🚫🚫🚫🚫🚫 🚫🚫🚫🚫🚫🚫🚫
    const walletSignIn = () => {
      try {
        const ethereum = useMemo(() => window.ethereum, []);
        const connectMetamask = useCallback(async () => {
          if (!ethereum) return { signer: null };
          // @ts-ignore
          const provider = new ethers.providers.Web3Provider(ethereum);
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const { signature, address } = await getSigner(provider, accounts[0]);
          connect(address, signature, "metamask");
          // @ts-ignore
          window.ethereum.on("accountsChanged", async (accounts: string[]) => {
            if (accounts.length > 0) {
              const { signature, address, signer } = await getSigner(
                provider,
                accounts[0]
              );
              connect(address, signature, "metamask");
            }
          });
          // @ts-ignore
          window.ethereum.on("chainChanged", async (_chainId: any) => {
            window.location.reload(); // As recommended by metamask doc
          });
        }, [connect, ethereum]);
        return { connectMetamask };
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });
        throw new chatxbtUtils.Issue(500, error?.message);
      }
    };

        const checkUserNetwork = async () => {

        if (window.ethereum) {
  
          const networkId = await window.ethereum.request({ method: 'net_version' });
  
          if (networkId !== '5') {
  
            console.log('Please switch to the Goerli network in MetaMask to use this application.');
  
          };
  
        } else {
  
          console.log('Please install and enable MetaMask to use this application.');
  
        }
      }

    const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse: any) => {
        console.log(tokenResponse, '[Google authentication successful]');
        const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: 'application/json'
          },
        }).then(res => res);

        console.log(userInfo);
      //   // handleGoogleAuth(tokenResponse.access_token);
      },
      onError: () => {
        console.log("[Google authentication failed]");
      },
    });

    //google auth
    const handleGoogleAuth = async (token: any) => {
      try {
        const response = await chatxbtApi.authWithGoogle(token);
        console.log(response);

        // const jwt = response?.data.token;
        // const user = response?.data;

        // if (jwt) {
        //   connect(
        //     user,
        //     jwt,
        //   );
        // }


        // if (!jwt) {
        //   walletDisconnect();
        //   throw new chatxbtUtils.Issue(401, response.message);
        // }

      } catch (error: any) {
        console.log(error);
      }
    }

    /**
     * join waitlist
     */
    const joinWaitlist = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      submitEmail(email);
    };

    /**
     * sign out account
     */
    const signOut = () => {
      walletDisconnect();
      disconnect();
    };

    return {
      store: {
        _hasHydrated,
        signature,
        connected,
        address,
        wagmiData,
        provider,
        visibleAddress,
        googleLogin,

        variables,
        signMessageData,
        // waitlist store (this has to be refactored)
        email,
        message,
        loading,
        sendFormValid,
        error,
        userInfo
      },
      action: {
        joinWaitlist,
        walletSignIn,
        handleWalletSignIn,
        getSigner,
        signAndConnectUser,
        signOut,
        handleGoogleAuth,
        checkUserNetwork,
        connect
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
