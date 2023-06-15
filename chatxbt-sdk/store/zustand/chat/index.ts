import { ChatStore } from "@chatxbt-sdk/interface/chat";
import { botInit, generateId } from "@chatxbt-sdk/utils";
import { botDisplayImage } from "@chatxbt-sdk/utils/assets";
import { create } from "zustand";
import { createJSONStorage, persist, devtools } from 'zustand/middleware'


const chatStorage = "chat-storage";

export const useChatStore = create<ChatStore>()(
    devtools(
        persist(
            (set) => ({
                chatMessage: '',
                messageHolder: '',
                status: '',
                messages: [],
                preview: true,
                chatData: null,
                botReply: '',
                updateMessage: (chatMessage) => {
                    set({ status: 'Updating' });
                    set(() => ({ chatMessage: chatMessage, messageHolder: chatMessage }))
                },
                sendMessage: (chatMessage: any) => {
                    let chatId = generateId.default();
                    const userDp = '/images/chat/user.png';
                    set({ preview: false });
                    set((state) => ({
                        messages: [...state.messages,
                        { dp: userDp, from: 'user', id: chatId, message: chatMessage }], chatMessage: '', status: 'Sent'
                    }));
                },
                generateResponse: (message: string) => {
                    let chatId = generateId.default();
                    set((state) => ({
                        messages: [...state.messages,
                        { dp: botDisplayImage.default, from: 'bot', id: chatId, message }], status: 'Done', messageHolder: ''
                    }));
                },

                resetMessage: () => {
                    set({ status: '' })
                },

                setPreview: (param: boolean) => {
                    set({ preview: param });
                }
            }),
            {
                name: chatStorage
            }
        )
    )
); 
