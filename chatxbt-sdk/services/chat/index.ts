import { 
    useCallback, 
    useMemo, 
    useRef 
} from "react"
import {
    chatxbtStore,
    chatxbtUtils,
    chatxbtDataProvider,
    chatxbtConfig
} from "../.."

export const chat = (props: any) =>  {

    // data provider modules
    const {
        chatxbtApi
    } = chatxbtDataProvider

    // store module
    const { 
        useChatStore, 
        useConnectionStore 
    } = chatxbtStore.zustandStore

    // chat store
    const { 
        message,
        messageHolder,
        status,
        messages,
        preview,
        chatData,
        botReply,
        // functions
        setMessage,
        submit,
        generateResponse,
        resetMessage,
        setPreview
    } = useChatStore((state: any) => ({ 
        message: state.chatMessage,
        messageHolder: state.messageHolder,
        status: state.status,
        messages: state.messages,
        preview: state.preview,
        chatData: state.chatData,
        botReply: state.botReply,
        setMessage: state.updateMessage,
        submit: state.sendMessage,
        generateResponse: state.generateResponse,
        resetMessage: state.resetMessage,
        setPreview: state.setPreview
    }))

    // connection store
    const {
        provider,
    } = useConnectionStore((state: any) => ({
        provider: state.provider,
    }))

    const ref = useRef<null | HTMLDivElement>(null);
    const chatInputRef = useRef<null | HTMLInputElement>(null);

    const sendResponse = (message: string) => {
        generateResponse(message)
    }

    const addHint = (param: any) => {
        setMessage(param);
        chatxbtUtils.handleRefs.default().handleChatInputFocus(chatInputRef);
    }

    const sendMessage = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!message.length) return;
        submit(message);
    };

    const connectResolver = () => {
        try {
            (async () => {
                const { xbtResolve } = await resolvePrompt()
                const result = await xbtResolve(messageHolder);
                sendResponse(result?.message);
            })()
        } catch (error) {
            
        }
    }

    const hints = chatxbtUtils.promptData.default.AIPrompts
        .filter((word) => {
            const typedCommand = message.toLowerCase();
            const keyword = word.prompt.toLowerCase();
            return typedCommand && keyword.startsWith(typedCommand) && keyword !== typedCommand;
        }).slice(0, 10);
    
    const scrollDown = () => {
        chatxbtUtils.handleRefs.default().scrollToLastChat(ref);
    };

    const queryAiChatBot = async (message: string) => {
        try {
            const botRes = await chatxbtApi.queryAi({
                text: message
            })
            const botReply = botRes?.data || chatxbtConfig.lang.defaultRelies[Math.floor(Math.random() * chatxbtConfig.lang.defaultRelies.length)];
            return {
                status: true,
                type: 'default-text', 
                message: botReply
            }
        } catch (error: any) {
            throw new chatxbtUtils.Issue(500, error?.message);
        }
    }

    const resolvePrompt = async () => {
        try {
            const resolver = new chatxbtUtils.ChatXBTResolver()
            const xbtResolve = async (message: string) => {
              const resolvedMessage: any = await resolver.resolveMsg(message, provider)
              if(resolvedMessage?.status){
                return resolvedMessage
              }
              return await queryAiChatBot(message);
            }
            return { xbtResolve }
        } catch (error: any) {
            throw new chatxbtUtils.Issue(500, error?.message);
        }
    }

    return {
        store: {
            ref,
            chatInputRef,
            message,
            messageHolder,
            status,
            messages,
            preview,
            chatData,
            botReply,
            hints
        },
        action: {
            resolvePrompt,
            queryAiChatBot,
            setMessage,
            sendMessage,
            generateResponse,
            resetMessage,
            setPreview,
            scrollDown,
            connectResolver,
            addHint
        },
        ...props
    }
}