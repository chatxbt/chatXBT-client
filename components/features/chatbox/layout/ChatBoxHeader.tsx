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

const ChatBoxHeader = ({ action: { signOut } }: any) => {
  const [click, setClick] = useState<boolean>(false);
  const handleToggle = () => setClick(!click);
  const { visibleAddress, disconnect } = useConnectionStore();

  const startDisconnect = (e: any) => {
    e.target.innerText = "Disconnect";
  };

  const stopDisconnect = (e: any) => {
    e.target.innerText = visibleAddress;
  };

  return (
    <>
      {click && <MobileSideBar handleToggle={handleToggle} signOut={signOut} />}
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
                legacyBehavior
                key={index}
              >
                <a
                  className={`nav-link`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.name}
                </a>
              </Link>
            ))}
          </div>
          <div className={style.buttons}>
            <button id={style.first}>Integrate protocol</button>
            {/* {visibleAddress && (
              <button
                id={style.second}
                // onClick={disconnect}
                onClick={signOut}
                onMouseEnter={startDisconnect}
                onMouseLeave={stopDisconnect}
              >
                {visibleAddress}
              </button>
            )} */}
            <Web3Button />
          </div>
        </div>
      </div>
    </>
  );
};

// export default ChatBoxHeader;
const C = (props: any) => <ChatBoxHeader {...chatxbtServices.auth(props)} />;
export default C;
