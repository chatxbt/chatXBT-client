import { create } from "zustand";
import { api, envConfig } from "../../../config";
import { Store } from "../../../interface/waitlist";


export const useStore = create<Store>((set) => ({
    email: '',
    message: '',
    error: '',
    loading: false,
    updateEmail: (email) => set(() => ({ email: email })),
    sendEmail: async (email: any) => {

        let captcha = localStorage.getItem('capToken');

        set({
            loading: true
        });

        await api.default().post('/waitlist/subscribe', { email, captcha }).then((res) => {
            const { status, message, data } = res.data;

            if (status) {

                set({
                    loading: false,
                    message: `You're now on the waitlist.`,
                    email: ''
                });

            } else {

                set({
                    loading: false,
                    message: message,
                    // email: ''
                });
            }
        }).catch((err) => {

            console.log(err);
            set({
                loading: false,
                error: err?.response?.data?.message,
                // email: ''
            });
        });

    },
    clearMessage: () => set(() => ({ message: '' })),
    clearError: () => set(() => ({ error: '' })),
}));