import Link from "next/link";
import React, { useState } from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/chat/layout.module.scss";
import { nav } from "./data";
import * as HiIcons from "react-icons/hi";
import Logo from "@components/shared/logo/Logo";
import MobileSideBar from "./MobileSideBar";
import { useConnectionStore } from "@chatxbt-sdk/store/zustand/connection";
import { chatxbtServices } from "../../../../chatxbt-sdk";
import { Web3Button } from "../../onboarding/GetStarted";
import * as VsIcons from "react-icons/vsc";
import * as Hi2Icons from "react-icons/hi2";
import { motion } from "framer-motion";

const ChatBoxHeader = ({
  store: { userInfo, googleAuth },
  action: { signOut, handleGoogleSignout },
}: any) => {
  const [click, setClick] = useState<boolean>(false);
  const handleToggle = () => setClick(!click);
  const { visibleAddress, disconnect } = useConnectionStore();

  const startDisconnect = (e: any) => {
    e.target.innerText = "Disconnect";
  };

  const stopDisconnect = (e: any) => {
    e.target.innerText = visibleAddress;
  };

  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    if (dropdown) {
      setDropdown(false);
      // document.body.style.overflow = "unset";
    } else {
      setDropdown(true);
      // document.body.style.overflow = "hidden";
    }
  };
  const placeholderImage = "/images/dashboard/user.png";

  const listTwo = {
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    hidden: { opacity: 0 },
  };

  console.log(userInfo);

  return (
    <>
      {click && (
        <MobileSideBar
          handleToggle={handleToggle}
          signOut={signOut}
          userInfo={userInfo}
          handleGoogleSignout={handleGoogleSignout}
          googleAuth={googleAuth}
        />
      )}
      <div className={style.chatHeader}>
        <div className={classInit.addConClass(style.nav)}>
          <div className={style.mobileHeader}>
            <Logo />
            <button onClick={handleToggle}>
              <HiIcons.HiOutlineMenu />
            </button>
          </div>
          <div className={style.links}>
            {nav.map((data: any, index: any) => (
              <Link
                href={data.href}
                scroll={false}
                passHref
                // legacyBehavior
                key={index}
              >
                <a className={`nav-link`}>{data.name}</a>
              </Link>
            ))}
          </div>
          <div className={style.buttons}>
            <button id={style.first}>Integrate protocol</button>
            {visibleAddress && (
              <button
                id={style.second}
                // onClick={disconnect}
                onClick={signOut}
                onMouseEnter={startDisconnect}
                onMouseLeave={stopDisconnect}
              >
                {visibleAddress}
              </button>
            )}
            <Web3Button />
            {googleAuth && (
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
                        onError={(e) =>
                          (e.currentTarget.src = placeholderImage)
                        }
                      />
                      <div>
                        <h3>{`${userInfo?.firstname} ${userInfo?.lastname}`}</h3>
                        <p>{userInfo?.email}</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleGoogleSignout}>Log out</button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// export default ChatBoxHeader;
const C = (props: any) => <ChatBoxHeader {...chatxbtServices.auth(props)} />;
export default C;
