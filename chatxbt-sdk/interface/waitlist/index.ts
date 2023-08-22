export type userState = {
    email: string;
}

export type Store = {
    email: string;
    message: string;
    error: string;
    loading: boolean;
    updateEmail: (email: userState['email']) => void;
    sendEmail: (email: userState['email']) => void;
    clearMessage: () => void;
    clearError: () => void;
}