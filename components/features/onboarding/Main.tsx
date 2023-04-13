import React, { useState } from "react";
import style from "@styles/get-started/index.module.scss";
import { motion } from "framer-motion";
import EmailAuth from "./EmailAuth";
import GetStarted from "./GetStarted";
import MetaAuth from "./MetaAuth";

const Main = () => {
  const [meta, setMeta] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(true);

  const handleMeta = () => {
    setMeta(true);
    setEmail(false);
    setStart(false);
  };

  const handleEmail = () => {
    setMeta(false);
    setEmail(true);
    setStart(false);
  };

  const handleStart = () => {
    setMeta(false);
    setEmail(false);
    setStart(true);
  };

  return (
    <>
      <motion.div
        className={style.main}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
      >
        {start && (
          <GetStarted handleEmail={handleEmail} handleMeta={handleMeta} />
        )}

        {meta && <MetaAuth handleStart={handleStart} />}

        {email && <EmailAuth handleStart={handleStart} />}
      </motion.div>
    </>
  );
};

export default Main;
