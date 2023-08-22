import {
    chatxbtStore
} from "../.."

export const utilityAndConfig = (props: any) =>  {
    const { utilityAndConfigStore } = chatxbtStore.zustandStore
    const { 
        _hasHydrated,
        isNewToApp,
        theme, 
        message,
        loading,
        setTheme,
        toogleNewToApp,
        setMessage,
        clearMessage,
        stopAllLoadingProccess
    } = utilityAndConfigStore((state: any) => ({ 
        _hasHydrated: state._hasHydrated,
        isNewToApp: state.isNewToApp,
        theme: state.theme, 
        message: state.message,
        loading: state.loading,
        stopAllLoadingProccess: state.stopAllLoadingProccess,
        setTheme: state.setTheme,
        toogleNewToApp: state.toogleNewToApp,
        setMessage: state.setMessage,
        clearMessage: state.clearMessage,
    }))

    return {
        store: {
            _hasHydrated,
            isNewToApp,
            theme, 
            message,
            loading,
        },
        action: {
            setTheme,
            toogleNewToApp,
            setMessage,
            clearMessage,
            stopAllLoadingProccess
        },
        ...props
    }
}