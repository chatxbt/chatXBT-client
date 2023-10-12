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
        userInfo: null,
        provider: '',
        visibleAddress: "",
        _hasHydrated: false,
        signMessage: (signature: string) => {
          set({ signature })
        },
        connect: (userInfo: any, token: string, address: string, signature: string, provider: string) => {
          set({ userInfo, token, provider, address, signature, visibleAddress: toolkit.ellipticAddress(address), connected: true })
        },
        disconnect: () => {
          set({ provider: '', address: "", token: "", signature: null, visibleAddress: "", connected: false });
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
          userInfo: state.userInfo,
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

