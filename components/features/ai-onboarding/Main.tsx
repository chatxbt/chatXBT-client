import React, { useEffect, useRef, useState } from "react";
import style from "@styles/onboarding/index.module.scss";
import { motion } from "framer-motion";
// import Typewriter from "@chatxbt-sdk/utils/typewritter/Typewriter";
import Link from "next/link";
import Typewriter from "@chatxbt-sdk/utils/typewriter/Typewriter";

const Main = () => {
  const [userName, setUsername] = useState("");
  const [messages, setMessages] = useState([
    "Hello! Welcome to ChatXBT.",
    "I am a DeFi Assistant developed by Deltastack Labs, focused solely on blockchain and the cryptocurrency ecosystem.",
    "May I know your name?",
  ]);

  const [finalMessages, setFinalMessages] = useState([
    `Nice to meet you ${userName}.`,
    "A few things you need to know before we continue:",
  ]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [allMessagesRendered, setAllMessagesRendered] = useState(false);
  const [startNextConversation, setStartNextConversation] = useState(false);
  const [currentNextMessageIndex, setCurrenNextMessageIndex] = useState(0);
  const [allSecondMessagesRendered, setAllSecondMessagesRendered] =
    useState(false);
  const [hideInput, setHideInput] = useState(false);

  const handleAllFirstMessagesRendered = () => {
    setAllMessagesRendered(true);
  };

    const handleAllSecondMessagesRendered = () => {
      if(currentNextMessageIndex === 2) setAllSecondMessagesRendered(true);
    };
    
  const triggerNextConversation = () => {
    if (userName.length > 0) {
      setStartNextConversation(true);
      setHideInput(true);
    } else {
      setStartNextConversation(false);
      setHideInput(false);
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
        setCurrenNextMessageIndex((prevIndex) => prevIndex + 1);
      }, finalMessages[currentNextMessageIndex].length * 50);
      return () => clearTimeout(timeoutTwo);
    } else {
      handleAllSecondMessagesRendered();
    }
  }, [startNextConversation, currentNextMessageIndex, finalMessages]);

  return (
    <div className={`container-fluid ${style.onBoarding}`}>
      <div className={style.mathsCon}></div>
      <div className="container" id={style.con}>
        <div id={style.chats}>
          <div className={style.chatLayout}>
            <img src={"/images/chat/bot.png"} alt="" />
            <div className={style.chatBody} ref={ref}>
              {messages
                .slice(0, currentMessageIndex + 1)
                .map((message, index) => (
                  <motion.div
                    id={style.chatCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                    key={index}
                  >
                    <div className={style.message}>
                      <Typewriter text={message} speed={50} />
                    </div>
                  </motion.div>
                ))}
              {allMessagesRendered && (
                <>
                  <motion.div
                    id={style.chatCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className={style.message}>
                      <Typewriter text="You can call me..." speed={80} />
                      <div className={style.inputDiv}>
                        {hideInput ? (
                          <div id={style.userReply}>
                            <div>{userName.charAt(0)}</div>
                            <span>{userName}</span>
                          </div>
                        ) : (
                          <>
                            <input
                              type="text"
                              placeholder={`what's your name`}
                              onChange={(e) => {
                                setUsername(e.target.value);
                                setFinalMessages([
                                  `Nice to meet you ${e.target.value}.`,
                                  "A few things you need to know before we continue:",
                                ]);
                              }}
                              value={userName}
                            />
                            <button onClick={triggerNextConversation}>
                              Send
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {startNextConversation &&
                finalMessages
                  .slice(0, currentNextMessageIndex + 1)
                  .map((message, index) => (
                    <motion.div
                      id={style.chatCard}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 0.2 },
                      }}
                      key={index}
                    >
                      <div className={style.message}>
                        <Typewriter text={message} speed={50} />
                      </div>
                    </motion.div>
                  ))}
              {startNextConversation && allSecondMessagesRendered && (
                <>
                  <motion.div
                    id={style.chatCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className={style.message}>
                      <span>
                        Kindly read our <Link href={"/"}>TOC</Link> and{" "}
                        <Link href={"/"}>Docs</Link> as it will provide you with
                        the necessary information and guidelines for ChatXBT
                      </span>
                    </div>
                  </motion.div>
                  <button id={style.btn}>Acknowledge & Get Started</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
