import { useStore } from "@chatxbt-sdk/store/zustand/waitlist";

export default () => {
    const [email, updateEmail] = useStore((state) => [state.email, state.updateEmail]);
    const message = useStore((state) => state.message);
    const loading = useStore((state) => state.loading);
    const error = useStore((state) => state.error);
    const submitEmail = useStore((state) => state.sendEmail);
    const closeMessage = useStore((state) => state.clearMessage);
    const closeError = useStore((state) => state.clearError);

    const sendFormValid = !email?.length;

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        submitEmail(email);
    }

    return {
        store: {
            email,
            message,
            loading,
            sendFormValid,
            error
        },
        action: {
            updateEmail,
            handleSubmit,
            closeMessage,
            closeError
        }
    }

};