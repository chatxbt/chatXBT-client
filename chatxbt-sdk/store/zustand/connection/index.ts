import { ConnectionStore } from "@chatxbt-sdk/interface/connection";
import { toolkit } from "@chatxbt-sdk/utils";
import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'


const storageName = 'connection-storage'

export const useConnectionStore = create<ConnectionStore>()(
  devtools(
    persist(
      (set) => ({
        signature: null,
        connected: false,
        address: "",
        provider: '',
        visibleAddress: "",
        _hasHydrated: false,
        signMessage: (signature: string) => {
          set({ signature })
        },
        connect: (address: string, signature: string, provider: string) => {
          set({ provider, address, signature, visibleAddress: toolkit.ellipticAddress(address), connected: true })
        },
        disconnect: () => {
          set({ provider: '', address: "", signature: null, visibleAddress: "", connected: false });
          window.localStorage.removeItem(storageName);
        },
        setHasHydrated: (state: any) => {
          set({
            _hasHydrated: state,
          });
        },
      }),
      {
        name: storageName,
        getStorage: () => localStorage,
        partialize: (state: any) => ({
          _hasHydrated: state._hasHydrated,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
)

