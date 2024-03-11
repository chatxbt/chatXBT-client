import { chatxbtUtils } from "@chatxbt-sdk/index";
import { useEffect, useRef, useState } from "react";

const useAiInteract = () => {

    const [userName, setUsername] = useState("");
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [allMessagesRendered, setAllMessagesRendered] = useState(false);
    const [startNextConversation, setStartNextConversation] = useState(false);
    const [currentNextMessageIndex, setCurrentNextMessageIndex] = useState(0);
    const [allSecondMessagesRendered, setAllSecondMessagesRendered] =
        useState(false);
    const [hideInput, setHideInput] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);

    const [messages, setMessages] = useState([
        "Hello! Welcome to ChatXBT.",
        "I am a DeFi Assistant developed by Deltastack Labs, focused solely on blockchain and the cryptocurrency ecosystem.",
        "May I know your name?",
    ]);

    const [finalMessages, setFinalMessages] = useState([
        `Nice to meet you ${userName}.`,
        "A few things you need to know before we continue:",
    ]);

    const handleAllFirstMessagesRendered = () => {
        setAllMessagesRendered(true);
    };

    const handleAllSecondMessagesRendered = () => {
        if (currentNextMessageIndex === 2) setAllSecondMessagesRendered(true);
    };

    const triggerNextConversation = () => {
        if (userName.length > 0) {
            setStartNextConversation(true);
            setHideInput(true);
            handleUserProfileName(userName);
        } else {
            setStartNextConversation(false);
            setHideInput(false);
        }
    };

    const handleShowAppFeatures = () => {
        setShowFeatures(true);
    };

    const handleUserProfileName = async (displayName: any) => {
        try {
            const { data } = await chatxbtUtils
                .privateApiConnect()
                .put("user/update-profile", { displayName });
            console.log(data);
        } catch (error: any) {
            console.log(error);
        }
    };

    const ref = useRef<null | HTMLDivElement>(null);

    const scrollToLastChat = (ref: any) => {
        if (ref.current != null) {
            ref.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToLastChat(ref);
    }, [currentMessageIndex, currentNextMessageIndex]);

    useEffect(() => {
        if (currentMessageIndex < messages.length) {
            const timeout = setTimeout(() => {
                setCurrentMessageIndex((prevIndex) => prevIndex + 1);
            }, messages[currentMessageIndex].length * 50);
            return () => clearTimeout(timeout);
        } else {
            handleAllFirstMessagesRendered();
        }
    }, [currentMessageIndex, messages]);

    useEffect(() => {
        if (
            startNextConversation &&
            currentNextMessageIndex < finalMessages.length
        ) {
            const timeoutTwo = setTimeout(() => {
                setCurrentNextMessageIndex((prevIndex) => prevIndex + 1);
            }, finalMessages[currentNextMessageIndex].length * 50);
            return () => clearTimeout(timeoutTwo);
        } else {
            handleAllSecondMessagesRendered();
        }
    }, [startNextConversation, currentNextMessageIndex, finalMessages]);


    return {
        store: {
            userName,
            currentMessageIndex,
            allMessagesRendered,
            startNextConversation,
            currentNextMessageIndex,
            allSecondMessagesRendered,
            hideInput,
            showFeatures,
            messages,
            finalMessages,
            ref,
        },
        action: {
            setUsername,
            setMessages,
            setFinalMessages,
            handleAllFirstMessagesRendered,
            handleAllSecondMessagesRendered,
            triggerNextConversation,
            handleShowAppFeatures,
            handleUserProfileName,
        }
    }

};

export default useAiInteract;