import Link from "next/link";
import React, { useState } from "react";
import { classInit } from "@chatxbt-sdk/utils";
import style from "@styles/chat/layout.module.scss";
import { nav } from "./data";
import * as HiIcons from "react-icons/hi";
import Logo from "@components/shared/logo/Logo";
import MobileSideBar from "./MobileSideBar";

const ChatBoxHeader = () => {
  const [click, setClick] = useState<boolean>(false);
  const handleToggle = () => setClick(!click);

  return (
    <>
      {click && <MobileSideBar handleToggle={handleToggle} />}
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
                <a className={`nav-link`}>{data.name}</a>
              </Link>
            ))}
          </div>
          <div className={style.buttons}>
            <button id={style.first}>Integrate protocol</button>
            <div id={style.second}>
              <button>0xwangwu.eth</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBoxHeader;
