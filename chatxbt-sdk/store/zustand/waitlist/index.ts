import { create } from "zustand";
import { chatxbtConfig, chatxbtUtils } from "../../../../chatxbt-sdk";
import { Store } from "../../../interface/waitlist";


export const useWaitlistStore = create<Store>((set) => ({
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

        await chatxbtUtils.privateApiConnect().post(chatxbtConfig.domains.endpoints.postWaitlist, { email, captcha }).then((res) => {
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