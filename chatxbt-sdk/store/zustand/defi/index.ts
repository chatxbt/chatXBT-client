import { DefiStore } from "@chatxbt-sdk/interface/defi";
import { toolkit } from "@chatxbt-sdk/utils";
import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'


const storageName = 'defi-storage'

export const useDefiStore = create<DefiStore>()(
  devtools(
    persist(
      (set) => ({
        configured: false,
        lightPool: null,
        protocols: [],
        tokens: [],
        intents: null,
        intentList: null,
        dexKeys: null,
        tokenKeys: null,
        addresses: [],
        heavyPool: [],
        _hasHydrated: false,
        setLightPool: (protocols: any) => {
          set({ lightPool: protocols })
        },
        setProtocols: (protocols: any) => {
          set({ protocols })
        },
        setTokens: (tokens: any) => {
          set({ tokens })
        },
        setIntents: (intents: any) => {
          set({ intents })
        },
        setDexKeys: (dexes: any) => {
          set({ dexKeys: dexes })
        },
        setTokenKeys: (tokens: any) => {
          set({ tokenKeys: tokens })
        },
        setAddress: (addresses: any) => {
          set({ addresses })
        },
        configure: (dexKeys: string, tokenKeys: string, addresses: any, intents: any, intentList: any) => {
          set({ dexKeys, tokenKeys, addresses, intents, intentList, configured: true })
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
        //   lightPool: state.lightPool,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
)

