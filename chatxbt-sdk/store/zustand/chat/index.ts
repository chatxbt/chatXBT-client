import { ChatStore } from "@chatxbt-sdk/interface/chat";
import { botInit, generateId } from "@chatxbt-sdk/utils";
import { botDisplayImage } from "@chatxbt-sdk/utils/assets";
import { create } from "zustand";


export const useChatStore = create<ChatStore>((set) => ({
    chatMessage: '',
    status: '',
    messages: [],
    preview: true,
    chatData: null,
    botReply: '',
    updateMessage: (chatMessage) => {
        set({ preview: false });
        set({ status: 'User typing...' });
        set(() => ({ chatMessage: chatMessage }))
    },
    sendMessage: (chatMessage: any) => {
        let chatId = generateId.default();
        const userDp = '/images/chat/user.png';

        set((state) => ({
            messages: [...state.messages,
            { dp: userDp, from: 'user', id: chatId, message: chatMessage }], chatMessage: '', status: 'Done'
        }));
    },
    generateResponse: (message: string) => {
        let chatId = generateId.default();
        set((state) => ({
            messages: [...state.messages,
            { dp: botDisplayImage.default, from: 'bot', id: chatId, message }], status: ''
        }));
    },

    resetMessage: () => {
        set({ status: '' })
    }
})); 