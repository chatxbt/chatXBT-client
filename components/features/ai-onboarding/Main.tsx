import React from "react";
import style from "@styles/onboarding/index.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";
import Typewriter from "@chatxbt-sdk/utils/typewriter/Typewriter";
import { FcApproval } from "react-icons/fc";
import useAiInteract from "@chatxbt-sdk/utils/ai-oborading-interact";

const Main = ({ setOnboard }: any) => {
  const {
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
      setFinalMessages,
      triggerNextConversation,
      handleShowAppFeatures,
    },
  } = useAiInteract();

  return (
    <div className={`container-fluid ${style.onBoarding}`}>
      <div className="container" id={style.con}>
        <div id={style.chats}>
          <div className={style.chatLayout}>
            <img src={"/images/chat/bot.png"} alt="" />
            <div className={style.chatBody} ref={ref}>
              {!showFeatures &&
                messages
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
                        <Typewriter text={message} speed={30} />
                      </div>
                    </motion.div>
                  ))}
              {!showFeatures && allMessagesRendered && (
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
                      <Typewriter text="You can call me..." speed={30} />
                      <div className={style.inputDiv}>
                        {hideInput ? (
                          <div id={style.userReply}>
                            <div>{userName.charAt(0).toUpperCase()}</div>
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

              {!showFeatures &&
                startNextConversation &&
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
                        <Typewriter text={message} speed={30} />
                      </div>
                    </motion.div>
                  ))}
              {!showFeatures &&
                startNextConversation &&
                allSecondMessagesRendered && (
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
                          Kindly read our{" "}
                          <Link
                            href={"https://docs.chatxbt.com/chatxbt-protocol/"}
                          >
                            Docs
                          </Link>{" "}
                          as it will provide you with the necessary information
                          and guidelines for ChatXBT
                        </span>
                      </div>
                    </motion.div>
                    {!showFeatures && (
                      <button id={style.btn} onClick={handleShowAppFeatures}>
                        Acknowledge & Continue
                      </button>
                    )}
                  </>
                )}
              {showFeatures && (
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
                      <Typewriter
                        text="ChatXBT - is your crypto execution assistant. with chatXBT you can talk directly to your crypto and chatXBT will execute your command"
                        speed={30}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className={style.features}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className={style.featureCard}>
                      <i>
                        <FcApproval />
                      </i>
                      <p>
                        Get ChatXBT to purchase crypto, bridge , swap as easily
                        as talking to a friend
                      </p>
                    </div>
                    <div className={style.featureCard}>
                      <i>
                        <FcApproval />
                      </i>
                      <p>
                        Access to crypto investments across DeFi, CeFi, and NFT
                        markets in any blockchain
                      </p>
                    </div>
                    <div className={style.featureCard}>
                      <i>
                        <FcApproval />
                      </i>
                      <p>Answers to real-time DeFi and blockchain data</p>
                    </div>
                    <div className={style.featureCard}>
                      <i>
                        <FcApproval />
                      </i>
                      <p>
                        Say goodbye to complex interfaces and endless logins,
                        accessing DeFi protocols is as easy as messaging a
                        friend
                      </p>
                    </div>
                  </motion.div>
                  <button
                    id={style.btn}
                    onClick={() => setOnboard(true)}
                  >
                    Get Started
                  </button>
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
