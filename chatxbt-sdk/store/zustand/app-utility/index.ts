import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'

/**
 * @param {}
 * @returns {void}
 */
export const utilityAndConfigStore = create<any>(
    devtools(
        persist(
            (set, get) => ({
            theme: 'dark-theme',
            isNewToApp: true,
            message: {
                type: null,
                show: false,
                title: '',
                description: '',
                inLine: false,
                alert: false,
                timeout: 5000
            },
            loading: {
                active: false,
                proccessesCount: 0,
                timeout: 10000,
                internalLoading: false,
                overlayedLoading: false
            },
            _hasHydrated: false,
            startLoading: (loading: any) => {
                set((state: any) => ({ 
                loading: {
                    ...state.loading,
                    ...loading,
                    active: true,
                    proccessesCount: state.loading.proccessesCount + 1,
                }
                }));
            },
            stopALoadingProccess: (loading: any) => {
                set((state: any) => ({ 
                loading: {
                    ...state.loading,
                    ...loading,
                    proccessesCount: state?.loading?.proccessesCount > 0 ? (state?.loading?.proccessesCount - 1) : 0
                }}));
            },
            stopAllLoadingProccess: () => {
                set({loading: { 
                active: false,
                proccessesCount: 0,
                timeout: 10000,
                internalLoading: false,
                overlayedLoading: false
                }});
            },
            setTheme: (theme: any) => {
                set({ theme })
            },
            toogleNewToApp: () => {
                set({ isNewToApp: false })
            },
            setMessage: ( message: any ) => {
                set({ message: { ...message }})
            },
            clearMessage: ( ) => {
                set({ message: {
                type: null,
                show: false,
                title: '',
                description: '',
                inLine: false,
                alert: false,
                timeout: 5000
                } })
            },
            setHasHydrated: (state: any) => {
                set({
                _hasHydrated: state
                });
            }
            }),
            {
                name: 'utilityAndConfig-storage',
                getStorage: () => localStorage,
                partialize: (state) => ({ 
                    theme: state.theme,
                    isNewToApp: state.isNewToApp
                }),
                onRehydrateStorage: () => (state) => {
                    state?.setHasHydrated(true)
                }
            }

        )
    )
)