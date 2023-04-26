import { ConnectionStore } from "@chatxbt-sdk/interface/connection";
import { etherUtils } from "@chatxbt-sdk/utils";
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
        signMessage: (signature) => {
          set({ signature })
        },
        connect: (address, signature, provider) => {
          set({ provider, address, signature, visibleAddress: etherUtils.ellipticAddress(address), connected: true })
        },
        disconnect: () => {
          set({ provider: '', address: "", signature: null, visibleAddress: "", connected: false });
          window.localStorage.removeItem(storageName);
        }
      }),
      {
        name: storageName,
      }
    )
  )
)

