import React from "react";
import { features } from "./data";
import * as MdIcons from "react-icons/md";
import { motion } from "framer-motion";
import style from "@styles/waitlist/index.module.scss";
import Navbar from "@components/app-layout/nav/Navbar";
import Alert from "@components/shared/notification";

const MainPage = (props: any) => {
  const {
    store: { email, message, loading, sendFormValid },
    action: { updateEmail, handleSubmit },
  } = props;

  return (
    <div className={`container-fluid ${style.home}`}>
      <Navbar />
      <Alert {...props} />
      <motion.div className={`container`} id={style.header}>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          The ChatGPT for DeFi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Your AI crypto companion. Trade, lend, stake, transfer, create
          multisigs, wallets, interact with protocols... Not with clicks, but
          with chat.
        </motion.p>

        <motion.form
          className={style.form}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          <motion.input
            whileFocus={{ x: 20 }}
            type={"email"}
            placeholder="Enter email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={sendFormValid}>
            {loading ? <Loader /> : "Join the waitlist"}
          </button>
        </motion.form>
        <motion.h6
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {`Welcome to #ChatFi.`}
        </motion.h6>
      </motion.div>

      <motion.div className={`container ${style.sample}`}>
        <motion.div
          className={style.dashboardImg}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.img
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.53 }}
            src="/images/other/vector.png"
            alt=""
            className={style.vectorImg}
          />
          <img src="/images/other/dash2.gif" alt="" className={style.img} />
        </motion.div>

        <motion.div
          className={style.feature}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
        >
          <motion.img
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.58 }}
            src="/images/other/icon.svg"
            alt=""
          />
          <h2>DeFi unleashed</h2>
          {features.map((data: any, index: any) => (
            <div className={style.cards} key={index}>
              <i>
                <MdIcons.MdOutlineCheck className={style.icon} />
              </i>
              <p>{data}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainPage;

export const Loader = () => <span className={style.loader}></span>;
