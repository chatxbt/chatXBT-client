import React, { useState } from "react";
import style from "@styles/get-started/index.module.scss";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const EmailAuth = ({ handleStart }: any) => {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const nextStep = () => {
    setStep((i: any) => i + 1);
  };

  const goBack = () => {
    setStep((i: any) => i - 1);
  };

  const emailAuthComponent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            id={style.first}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <BsIcons.BsFillArrowLeftCircleFill
              id={style.back}
              onClick={handleStart}
            />
            <label htmlFor="">Enter your email to continue</label>

            <input type="email" placeholder="Enter your email to sign up" />
            <button onClick={nextStep}>Continue with email</button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            id={style.second}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <BsIcons.BsFillArrowLeftCircleFill
              id={style.back}
              onClick={goBack}
            />
            <label htmlFor="">Generate your wallet</label>

            <p>{`Type "generate my wallet" to continue`}</p>

            <div className={style.customForm}>
              <input type="text" />
              <button onClick={nextStep}>
                <IoIcons.IoPaperPlaneOutline />
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            id={style.third}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <div id={style.span}>
              <AiIcons.AiOutlineCheck />
            </div>
            <h2>Your wallet has been generated</h2>
            <button onClick={() => router.push('/chat')}>Continue to chatboard</button>
          </motion.div>
        );

      default:
        return (
          <motion.div
            id={style.first}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <BsIcons.BsFillArrowLeftCircleFill
              id={style.back}
              onClick={handleStart}
            />
            <label htmlFor="">Enter your email to continue</label>

            <input type="email" placeholder="Enter your email to sign up" />
            <button onClick={nextStep}>Continue with email</button>
          </motion.div>
        );
    }
  };
  return (
    <motion.div className={style.emailAuth}>{emailAuthComponent()}</motion.div>
  );
};

export default EmailAuth;
