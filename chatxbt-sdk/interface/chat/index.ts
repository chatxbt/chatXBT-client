export type userState = {
    message: string;
}

export type ChatStore = {
    chatMessage: any;
    messageHolder: any;
    status: string;
    messages: any;
    chatData: any;
    preview: boolean;
    botReply: any;
    scroll: any;
    updateMessage: (chatMessage: userState['message']) => void;
    sendMessage: (chatMessage: userState['message']) => void;
    generateResponse: (message: string) => void;
    awaitMessage: () => void;
    resetMessage: () => void;
    setPreview: (param: boolean) => void;
    setScroll: (param: boolean) => void;
}