import { GamifyStore } from "@chatxbt-sdk/interface/gamify";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from 'zustand/middleware'


const storageName = 'gamify-storage'

export const useGamifyStore = create<GamifyStore>()(
  devtools(
    persist(
      (set) => ({
        gamifyTasks: null,
        gamifyPoints: null,
        gamifyReferrals: null,
        setGamifyTasks: (tasks: any) => {
          set({ gamifyTasks: tasks })
        },
        setGamifyPoints: (points: any) => {
          set({ gamifyPoints: points })
        },
        setGamifyReferrals: (points: any) => {
          set({ gamifyReferrals: points })
        },
      }),
      {
        name: storageName,
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
