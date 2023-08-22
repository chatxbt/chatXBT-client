import { randomBytes } from 'crypto'
import { useCallback, useMemo } from "react";
import { ethers } from 'ethers'
import { 
    chatxbtDataProvider,
    chatxbtStore,
    chatxbtUtils
} from "../.."

export const auth = (props: any) => {

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
            const signature = await window.ethereum.request({
              method: 'personal_sign',
              params: [
                `Verify Your Address ${account} Request Key: ${randomBytes(16).toString('hex')}`,
                account,
              ],
            });
          
            return { signer, signature, address: ethers.utils.getAddress(account) };
        } catch (error: any) {
            throw new chatxbtUtils.Issue(500, error?.message)
        }
    }

    //wallet sign in
    const walletSignIn = () => {
        try {
            const ethereum = useMemo(() => window.ethereum, []);
            const connectMetamask = useCallback(async () => {
              if (!ethereum) return { signer: null }
              const provider = new ethers.providers.Web3Provider(ethereum);
              const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
              });
              const { signature, address } = await getSigner(provider, accounts[0]);
              connect(address, signature, 'metamask');
              window.ethereum.on('accountsChanged', async (accounts: string[]) => {
                if (accounts.length > 0) {
                  const { signature, address, signer } = await getSigner(provider, accounts[0])
                  connect(address, signature, 'metamask');
                }
              });
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
        disconnect()
    }

    return {
        store: {
            signature,
            connected,
            address,
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
            getSigner,
            signOut
        },
        ...props
    }
}