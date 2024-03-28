import Link from "next/link";
import React, { useState } from "react";
import style from "@styles/nav/index.module.scss";
import * as BsIcons from "react-icons/bs";
import Logo from "@components/shared/logo/Logo";
import LogoTwo from "@components/shared/logo/LogoTwo";
import { chatxbtServices } from "../../../chatxbt-sdk";
import { motion } from "framer-motion";

const GetStartedNavPoints = ({
  store: { connected, userInfo },
  action: { getTwitterAccess, signOut },
}: any) => {
  const placeholderImage = "/images/dashboard/user.png";
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const listTwo = {
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    hidden: { opacity: 0 },
  };

  return (
    <div className={style.getStartedNavGamify}>
      <div className="container" id={style.con}>
        <LogoTwo />
        {connected && (
          <div className={style.googleProfileDiv}>
            <div className={style.profile}>
              <div onClick={handleDropdown}>
                <img
                  src={userInfo.avatar}
                  alt="Profile image"
                  onError={(e) => (e.currentTarget.src = placeholderImage)}
                />
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ type: "linear" }}
              variants={listTwo}
              className={`nav flex-column ${style.dropdown} ${
                dropdown ? style.show : style.hide
              }`}
            >
              <div id={style.header}>
                <h1>ACCOUNT</h1>
                <div id={style.user}>
                  <img
                    src={`${userInfo.avatar}`}
                    alt="Profile image"
                    onError={(e) => (e.currentTarget.src = placeholderImage)}
                  />
                  <div>
                    <h3>{`${userInfo?.firstname}`}</h3>
                    {/* <p>{userInfo?.email}</p> */}
                  </div>
                </div>
              </div>
              <button id={style.btn} onClick={() => signOut()}>
                Log out
              </button>
            </motion.div>
          </div>
        )}
        {!connected && (
          <button onClick={() => getTwitterAccess()} id={style.x}>
            Connect X
          </button>
        )}
      </div>
    </div>
  );
};

export default (props: any) => (
  <GetStartedNavPoints {...props} {...chatxbtServices.auth(props)} />
);
