import { ConnectionStore } from "@chatxbt-sdk/interface/connection";
import { toolkit } from "@chatxbt-sdk/utils";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from 'zustand/middleware'


const storageName = 'connection-storage'

export const useConnectionStore = create<ConnectionStore>()(
  devtools(
    persist(
      (set) => ({
        signature: null,
        connected: false,
        address: "",
        token: null,
        twitterAuth: null,
        twitterAuth2: null,
        userInfo: null,
        userRefferals: null,
        inAppWallet: null,
        provider: '',
        visibleAddress: "",
        _hasHydrated: false,
        signMessage: (signature: string) => {
          set({ signature })
        },
        setTwitterAuth: (twitterAuth: any) => {
          set({ twitterAuth })
        },
        setTwitterAuth2: (twitterAuth2: any) => {
          set({ twitterAuth2 })
        },
        connect: (userInfo: any, token: string, address: string, signature: string, provider: string) => {
          set({ userInfo, token, provider, address, signature, visibleAddress: toolkit.ellipticAddress(address), connected: true })
        },
        setInAppWallet: (wallet: any) => {
          set({ inAppWallet: wallet })
        },
        setUserRefferal: (refferals: number) => {
          set({ userRefferals: refferals })
        },
        disconnect: () => {
          set({ provider: '', address: "", token: "", signature: null, visibleAddress: "", twitterAuth: null, twitterAuth2: null, inAppWallet: null,  connected: false });
          // window.localStorage.removeItem(storageName);
        },
        setHasHydrated: (state: any) => {
          set({
            _hasHydrated: state,
          });
        },
      }),
      {
        name: storageName,
        storage: createJSONStorage(() => localStorage),
        partialize: (state: any) => ({
          _hasHydrated: state._hasHydrated,
          token: state.token,
          twitterAuth: state.twitterAuth,
          twitterAuth2: state.twitterAuth2,
          userInfo: state.userInfo,
          inAppWallet: state.inAppWallet,
          connected: state.connected,
          provider: state.provider,
          address: state.address,
          signature: state.signature,
          visibleAddress: state.visibleAddress,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
)

