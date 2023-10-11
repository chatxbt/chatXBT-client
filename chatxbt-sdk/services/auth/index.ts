//@ts-ignore
import { randomBytes } from 'crypto'
import Web3 from "web3";
import { useCallback, useMemo } from "react";
import { ethers } from 'ethers'
import { useAccount, useSignMessage, useNetwork, useDisconnect } from 'wagmi'
import { 
    chatxbtDataProvider,
    chatxbtStore,
    chatxbtUtils
} from "../.."

export const auth = (props: any) => {

    const { disconnect: walletDisconnect } = useDisconnect();
    const wagmiData = useAccount();
    const { chain } = useNetwork();
    const { signMessageAsync } = useSignMessage();


    // data provider modules
    const {
        chatxbtApi
    } = chatxbtDataProvider

    // store module
    const {
        useConnectionStore,
        utilityAndConfigStore,
        useWaitlistStore
    } = chatxbtStore.zustandStore

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
    }))

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
    }))

    // app utility and configuration store
    const { 
        setMessage,
        startLoading,
        stopALoadingProccess
    } = utilityAndConfigStore((state: any) => ({ 
        setMessage: state.setMessage,
        startLoading: state.startLoading,
        stopALoadingProccess: state.stopALoadingProccess,
    }))

    const sendFormValid = !email?.length;

    // get signer
    const getSigner = async (provider: any, account: string) => {
        try {
            const signer = provider.getSigner(account);
            // @ts-ignore
            const signature = await window.ethereum.request({
              // @ts-ignore
              method: 'personal_sign',
              params: [
                  // @ts-ignore
                `Verify Your Address ${account} Request Key: ${randomBytes(16).toString('hex')}`,
                account,
              ],
            });
          
            return { signer, signature, address: ethers.utils.getAddress(account) };
        } catch (error: any) {
            throw new chatxbtUtils.Issue(500, error?.message)
        }
    }

    const handleWalletSignIn = async (address: string) => {
        try {
            const response = await chatxbtApi.getMessageToSign({
                address
            })
            const messageToSign = response?.data;
            if (!messageToSign) {
              walletDisconnect();
              throw new chatxbtUtils.Issue(401, response.message);
            }
        
            const web3 = new Web3(Web3.givenProvider);
            const signature = await web3.eth.personal.sign(messageToSign, address, '');
            // const signature = await web3.eth.sign(messageToSign, address);
        
            const res = await chatxbtApi.getWalletJwt({
                address,
                signature
            });
        
            const jwt = res?.data.token;
            const user = res?.data;
      
            if (jwt) {
                connect(user, jwt, wagmiData.address, signature, wagmiData.connector?.id);
            }
        
            if (!jwt) {
              walletDisconnect();
              throw new chatxbtUtils.Issue(401, res.message);
            }
        } catch (error: any) {
            // alert(error.message);
            walletDisconnect();
            // throw new chatxbtUtils.Issue(500, error.message)
            // toast.success("You have successfully signed in");
        }
      };

    //wallet sign in [depreciated] 🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫
    const walletSignIn = () => {
        try {
            const ethereum = useMemo(() => window.ethereum, []);
            const connectMetamask = useCallback(async () => {
              if (!ethereum) return { signer: null }
              // @ts-ignore
              const provider = new ethers.providers.Web3Provider(ethereum);
              const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
              });
              const { signature, address } = await getSigner(provider, accounts[0]);
              connect(address, signature, 'metamask');
              // @ts-ignore
              window.ethereum.on('accountsChanged', async (accounts: string[]) => {
                if (accounts.length > 0) {
                  const { signature, address, signer } = await getSigner(provider, accounts[0])
                  connect(address, signature, 'metamask');
                }
              });
              // @ts-ignore
              window.ethereum.on('chainChanged', async (_chainId: any) => {
                window.location.reload(); // As recommended by metamask doc
              });
            }, [connect, ethereum]);
            return { connectMetamask }
        } catch (error: any) {
            throw new chatxbtUtils.Issue(500, error?.message)
        }
    }

    /**
     * join waitlist
     */
    const joinWaitlist = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        submitEmail(email);
    }

    /**
     * sign out account
     */
    const signOut = () => {
        disconnect();
        walletDisconnect();
    }

    return {
        store: {
            _hasHydrated,
            signature,
            connected,
            address,
            wagmiData,
            provider,
            visibleAddress,
            // waitlist store (this has to be refactored)
            email,
            message,
            loading,
            sendFormValid,
            error
        },
        action: {
            joinWaitlist,
            walletSignIn,
            handleWalletSignIn,
            getSigner,
            signOut
        },
        ...props
    }
}