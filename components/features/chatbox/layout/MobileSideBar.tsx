import React from "react";
import style from "@styles/chat/layout.module.scss";
import { useRouter } from "next/router";
import { chatLinks, socials } from "./data";
import Link from "next/link";
import * as MdIcons from "react-icons/md";
import Logo from "@components/shared/logo/Logo";
import { motion } from "framer-motion";
import { useConnectionStore } from "@chatxbt-sdk/store/zustand/connection";

const MobileSideBar = ({ handleToggle, signOut }: any) => {
  console.log(signOut);
  const router = useRouter();
  const handleClick = (url: any) => router.push(url);

  const { visibleAddress, disconnect } = useConnectionStore();

  const startDisconnect = (e: any) => {
    e.target.innerText = "Disconnect";
  };

  const stopDisconnect = (e: any) => {
    e.target.innerText = visibleAddress;
  };

  return (
    <motion.div
      className={style.mobileSidebar}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div className={style.header}>
        <Logo />
        <button onClick={handleToggle}>
          <MdIcons.MdOutlineClose />
        </button>
      </div>
      <ul className={`navbar-nav`}>
        {chatLinks.map((data: any, index: any) => {
          const active = router.asPath === data.href;
          return (
            <li className={`nav-item`} key={index}>
              <button
                onClick={() => handleClick(data.href)}
                className={active ? style.active : ""}
              >
                <i>{data.icon}</i>
                <p>{data.title}</p>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={style.buttons}>
        {visibleAddress && (
          <button
            id={style.first}
            onClick={signOut}
            onMouseEnter={startDisconnect}
            onMouseLeave={stopDisconnect}
          >
            {visibleAddress}
          </button>
        )}
      </div>

      <div className={style.socialCon}>
        <h3>Follow us:</h3>
        <div className={style.icons}>
          {socials.map((data: any, index: any) => (
            <Link href={data.href} key={index}>
              <i>{data.icon}</i>
            </Link>
          ))}
        </div>
        <div className={style.btn}>
          <button>Upgrades Coming Soon</button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileSideBar;
