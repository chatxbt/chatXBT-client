import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import {
    chatxbtServices
} from "../../../chatxbt-sdk"

export const useAppEntry = (props: any) => {
    const authService = chatxbtServices.auth(props);
    const {
        store: { 
            _hasHydrated,
            wagmiData,
            connected
        },
        action: { 
            handleWalletSignIn,
            signOut
        }
    } = authService;

    useEffect(() => {
        !connected
        && _hasHydrated
        && wagmiData.isConnected 
        && wagmiData.address 
        && handleWalletSignIn(wagmiData.address);
    }, [wagmiData.isConnected, wagmiData.address]);

    useEffect(() => {
        // connected && props.history.push('/chat');
        // !connected && props.history.push('/');
        // signOut();
    }, [connected]);

    return {
        store: {
            connected
        }
    };
}