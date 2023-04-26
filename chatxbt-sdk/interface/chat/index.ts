export type userState = {
    message: string;
}

export type ChatStore = {
    chatMessage: any;
    status: string;
    messages: any;
    chatData: any;
    preview: boolean;
    botReply: any;
    updateMessage: (chatMessage: userState['message']) => void;
    sendMessage: (chatMessage: userState['message']) => void;
    generateResponse: (message: string) => void;
    resetMessage: () => void;
}