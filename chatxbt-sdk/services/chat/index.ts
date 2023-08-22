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
        useDefiStore,
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

    // defi store
    const { 
        configured,
        lightPool,
        heavyPool,
        _hasHydrated,
        protocols,
        tokens,
        intents,
        intentList,
        dexKeys,
        tokenKeys,
        addresses,
    } = useDefiStore((state: any) => ({
        configured: state.configured,
        lightPool: state.lightPool,
        heavyPool: state.heavyPool,
        protocols: state.protocols,
        tokens: state.tokens,
        intents: state.intents,
        intentList: state.intentList,
        dexKeys: state.dexKeys,
        tokenKeys: state.tokenKeys,
        addresses: state.addresses,
        _hasHydrated: state._hasHydrated,
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
    /**
     * 📝📝📝 NOTE: funtion will be refactored later
     * 
     * 1. intent should be intialised along user context session from backend
     * 
     * 2. queryAichatBot is one among three key models 
     * 
     * - a decision making model to process prompt and decide if prompt
     * should trigger a call to action or maintain communication context
     * 
     * - an NLP processing model to process random user prompts to match
     * intents configured for compromise
     * 
     * - a conversation model to maintain comunication within context
     * 
     * @param message 
     * @returns 
     */
    const nlpAiBot = async (message: string) => {
        try {

            const botRes = await chatxbtApi.nlpPrompt({
                text: message,
                intent: JSON.stringify(intentList),
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

    const conversationAiBot = async (message: string) => {
        try {

            const botRes = await chatxbtApi.queryAi({
                text: message,
                intent: JSON.stringify(intentList),
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
            const resolver = new chatxbtUtils.ChatXBTResolver({
                intents,
                dexKeys,
                tokenKeys,
                addresses
            })
            const xbtResolve = async (message: string) => {
              // cv prompting
              const {
                  message: cv
              } =  await conversationAiBot(message);

              if( chatxbtUtils.toolkit.doesNotContainWord(cv, 'DEFI-DETECTED')){
                return {
                    status: true,
                    type: 'default-text', 
                    message: cv
                }
              }
              // nlp prompting
              const {
                  message: msg
              } =  await nlpAiBot(message);
              alert(msg);
              const resolvedMessage: any = await resolver.resolveMsg(msg, provider)
              const internalHandler = new chatxbtUtils.IntentHandler({})
              if(resolvedMessage?.status){
                return resolvedMessage
              }
            //   return await queryAiChatBot(message);
            return {
                status: true,
                type: 'default-text', 
                message: 'please try again'
            }
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
            nlpAiBot,
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