import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  chatxbtStore,
  chatxbtUtils,
  chatxbtDataProvider,
  chatxbtConfig,
} from "../..";
import { actionTypes } from "@chatxbt-sdk/config/constants";

import {
  useAccount,
  useSignMessage,
  useDisconnect,
  useWalletClient,
  usePublicClient,
  // type WalletClient,
} from "wagmi";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { NewResolver } from "@chatxbt-sdk/utils/nlp-core/resolver/Resolver";

export const chat = (props: any) => {
  // data provider modules
  const { chatxbtApi } = chatxbtDataProvider;

  // store module
  const { useDefiStore, useChatStore, useConnectionStore } =
    chatxbtStore.zustandStore;

  // chat store
  const {
    message,
    messageHolder,
    status,
    messages,
    preview,
    chatData,
    botReply,
    scroll,
    confirmation,
    // functions
    setMessage,
    submit,
    generateResponse,
    resetMessage,
    setPreview,
    setScroll,
    awaitMessage,
    sendConfirmation,
    clearConfirmation

  } = useChatStore((state: any) => ({
    message: state.chatMessage,
    messageHolder: state.messageHolder,
    status: state.status,
    messages: state.messages,
    preview: state.preview,
    chatData: state.chatData,
    botReply: state.botReply,
    scroll: state.scroll,
    confirmation: state.confirmation,
    setMessage: state.updateMessage,
    submit: state.sendMessage,
    generateResponse: state.generateResponse,
    resetMessage: state.resetMessage,
    setPreview: state.setPreview,
    setScroll: state.setScroll,
    awaitMessage: state.awaitMessage,
    sendConfirmation: state.sendConfirmation,
    clearConfirmation: state.clearConfirmation
  }));

  // connection store
  const { provider } = useConnectionStore((state: any) => ({
    provider: state.provider,
  }));

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
  }));

  const wagmiData = useAccount();
  const {
    data: signMessageData,
    error: wgmE,
    signMessage: wgsm,
    variables,
    signMessageAsync,
  } = useSignMessage();

  // const publicClient = usePublicClient();

  const { data: walletClient } = useWalletClient({ chainId: wagmiData.chainId || 5 });

  const ref = useRef<null | HTMLDivElement>(null);
  const chatInputRef = useRef<null | HTMLInputElement>(null);

  const walletClientToSigner = async (walletClient: any) => {
    const { account, chain, transport } = walletClient;
    console.log("chain", chain);
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    console.log("network", network);
    const provider = new BrowserProvider(transport, network);
    // const signer = new JsonRpcSigner(provider, account.address);
    const signer = await provider.getSigner(account.address);
    return signer;
  };

  /** Hook to convert a viem Wallet Client to an ethers.js Signer. */
  const useEthersSigner = ({ chainId }: { chainId?: number } = {}) => {
    // const { data: walletClient } = useWalletClient({ chainId })
    return React.useMemo(
      () => (walletClient ? walletClientToSigner(walletClient) : undefined),
      [walletClient]
    );
  };

  const sendResponse = (message: string) => {
    generateResponse(message);
  };

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [mentionStartIndex, setMentionStartIndex] = useState<any>(null);

  const allProtocols = dexKeys?.split('|');

  // console.log(allProtocols);

  const fetchSuggestions = (query: string) => {
    let dexesSuggestions = dexKeys?.split('|');
    return dexesSuggestions?.filter((suggestion: string) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleUserInput = () => {

    const atIndex = message.lastIndexOf("@");
    if (atIndex !== -1) {
      setMentionStartIndex(atIndex + 1);

      const fetchedSuggestions = fetchSuggestions(
        message.substring(atIndex + 1)
      );
      setSuggestions(fetchedSuggestions);

      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setMentionStartIndex(null);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {

    const updatedMessage =
      message.slice(0, mentionStartIndex - 1) +
      `@${suggestion} ` +
      message.slice(mentionStartIndex + suggestion.length - 1);

    setMessage(updatedMessage);
    setSuggestions([]);
    setShowSuggestions(false);
    setMentionStartIndex(null);

    chatxbtUtils.handleRefs.default().handleChatInputFocus(chatInputRef);
  };

  const handleBlur = () => {
    setShowSuggestions(false);
    setMentionStartIndex(null);
  };

  const addHint = (param: any) => {
    setMessage(param);
    chatxbtUtils.handleRefs.default().handleChatInputFocus(chatInputRef);
  };

  const sendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!message.length) return;
    if (status === actionTypes.PENDING) return;
    submit(message);
    connectResolver();
    awaitMessage();
  };

  const rePrompt = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!messageHolder.length) return;
    submit(messageHolder);
    connectResolver();
    awaitMessage();
  };

  const connectResolver = () => {
    try {
      (async () => {
        const { xbtResolve } = await resolvePrompt();
        const result = await xbtResolve(messageHolder);

        // if (result?.type.includes('preview')) {
        //   sendConfirmation(result);
        //   resetMessage();
        // } else {
        //   sendResponse(result);
        // };
        
        sendResponse(result);

        console.log(result);
      })();
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        chatxbtUtils.toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });
    }
  };


  const hints = chatxbtUtils.promptData.default.AIPrompts.filter((word) => {
    const typedCommand = message.toLowerCase();
    const keyword = word.prompt.toLowerCase();

    return (
      typedCommand &&
      keyword.startsWith(typedCommand) &&
      keyword !== typedCommand
    );
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
      });
      const botReply =
        botRes?.data ||
        chatxbtConfig.lang.defaultRelies[
        Math.floor(Math.random() * chatxbtConfig.lang.defaultRelies.length)
        ];
      return {
        status: true,
        type: "default-text",
        message: botReply,
      };
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        chatxbtUtils.toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      // throw new chatxbtUtils.Issue(500, error?.message);
    }
  };

  const conversationAiBot = async (message: string) => {
    try {
      const botRes = await chatxbtApi.queryAi({
        text: message,
        intent: JSON.stringify(intentList),
      });
      const botReply =
        botRes?.data ||
        chatxbtConfig.lang.defaultRelies[
        Math.floor(Math.random() * chatxbtConfig.lang.defaultRelies.length)
        ];
      return {
        status: true,
        type: "default-text",
        message: botReply,
      };
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 403)
        chatxbtUtils.toolkit.slackNotify({
          message: JSON.stringify(error?.response?.message),
        });

      // throw new chatxbtUtils.Issue(500, error?.message);
    }
  };


  const resolvePrompt = async (): Promise<any> => {
    try {
      console.log("walletClient", walletClient);

      const signer = await walletClientToSigner(walletClient as any);

      const { protocols } = lightPool;

      // const resolver = new chatxbtUtils.ChatXBTResolver({
      //   intents,
      //   dexKeys,
      //   tokenKeys,
      //   addresses,
      //   address: wagmiData.address,
      //   signer,
      //   protocols
      // });

      const resolver = new NewResolver({
        intents,
        dexKeys,
        tokenKeys,
        addresses,
        address: wagmiData.address,
        signer,
        protocols,
        wagmiData
      });

      const xbtResolve = async (message: string) => {
        // cv prompting
        const { message: cv }: any = await conversationAiBot(message);

        if (chatxbtUtils.toolkit.doesNotContainWord(cv, "DEFI-DETECTED")) {
          return {
            status: true,
            type: "default-text",
            message: cv,
          };
        }
        // // nlp prompting
        const { message: msg }: any = await nlpAiBot(message);

        // alert(msg);

        // const resolvedMessage: any = await resolver.resolveMsg(msg, provider);
          const resolvedMessage: any = await resolver.resolveMsg(msg, provider, signer, protocols);

          if (resolvedMessage?.status) {
            return resolvedMessage;
          }
          //   return await queryAiChatBot(message);
          return {
            status: true,
            type: "default-text",
            message: "please try again",
          };
        };
        return { xbtResolve };
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });

        console.log(error?.message);

        // throw new chatxbtUtils.Issue(500, error?.message);
      }
    };
  // }

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
      hints,
      scroll,
      showSuggestions,
      suggestions,
      confirmation
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
      addHint,
      rePrompt,
      handleUserInput,
      handleSuggestionClick,
      handleBlur,
      fetchSuggestions,
      // handleScroll
      setScroll,
      sendConfirmation,
      clearConfirmation,
      awaitMessage
    },
    ...props,
  };
};
