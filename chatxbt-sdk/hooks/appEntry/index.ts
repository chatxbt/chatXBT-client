import { handleRefs } from "@chatxbt-sdk/utils";
import { useEffect } from "react";
import {
    chatxbtServices
} from "../../../chatxbt-sdk"

export const useAppEntry = (props: any) => {
    const authService = chatxbtServices.auth(props);
    const defiService = chatxbtServices.defi(props);
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

    const {
        store: { 
            configured,
            lightPool
        },
        action: { 
            loadLightPoolAndInitialiseNlpCoreConfigs
        }
    } = defiService

    useEffect(() => {
        !connected
        && _hasHydrated
        && wagmiData.isConnected 
        && wagmiData.address 
        && handleWalletSignIn(wagmiData.address);
    }, [wagmiData.isConnected, wagmiData.address]);

    useEffect(() => {
        // localStorage.clear();
        // connected && props.history.push('/chat');
        // !connected && props.history.push('/');
        // signOut();
        !configured && connected && loadLightPoolAndInitialiseNlpCoreConfigs()
    }, [connected]);

    return {
        store: {
            connected
        },
        action: {
            loadLightPoolAndInitialiseNlpCoreConfigs
        }
    };
}