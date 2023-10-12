import { actionTypes } from "@chatxbt-sdk/config";
import { ChatStore } from "@chatxbt-sdk/interface/chat";
import { botInit, toolkit } from "@chatxbt-sdk/utils";
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
                scroll: '',
                updateMessage: (chatMessage: any) => {
                    set(() => ({
                        chatMessage: chatMessage,
                        messageHolder: chatMessage
                    }))
                },
                sendMessage: (chatMessage: any) => {
                    let chatId = toolkit.generateUUID();
                    const userDp = '/images/chat/user.png';
                    set({ preview: false });
                    set((state: { messages: any; }) => ({
                        messages: [...state.messages,
                        {
                            dp: userDp,
                            from: 'user',
                            id: chatId,
                            message: chatMessage
                        }], chatMessage: '', status: actionTypes.SENT
                    }));
                },
                generateResponse: (messageData: any) => {
                    let chatId = toolkit.generateUUID();
                    set((state: { messages: any; }) => ({
                        messages: [...state.messages,
                        {
                            dp: botDisplayImage.default,
                            from: 'bot',
                            id: chatId,
                            type: messageData.type,
                            message: messageData.message,
                            metadata: messageData?.metadata,
                        }], status: actionTypes.DONE, 
                    }));
                },

                awaitMessage: () => {
                    set({ status: actionTypes.PENDING })
                },
                resetMessage: () => {
                    set({ status: '' })
                },

                setPreview: (param: boolean) => {
                    set({ preview: param });
                },

                setScroll: (param: boolean) => {
                    set({scroll: param})
                },
                setHasHydrated: (state: any) => {
                    set({
                        _hasHydrated: state
                    });
                }
            }),
            {
                name: chatStorage,
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                }),
                onRehydrateStorage: () => (state: any) => {
                    state?.setHasHydrated(true)
                }
            }
        )
    )
); 