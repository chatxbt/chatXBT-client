import Link from "next/link";
import React from "react";
import style from "@styles/nav/index.module.scss";
import * as BsIcons from "react-icons/bs";
import Logo from "@components/shared/logo/Logo";
import LogoTwo from "@components/shared/logo/LogoTwo";

const GetStartedNav = () => {
  return (
    <div className={style.getStartedNav}>
      <div className="container" id={style.con}>
        {/* <Logo /> */}
        <LogoTwo />
        <div id={style.details}>
          <h2>new to chatFi? </h2>
          <Link rel="noopener noreferrer" target="_blank" href={"https://tricky-robe-698.notion.site/chatFI-test-guide-b17d4c9464dc4183b629b6d86b4e74fd?pvs=4"}>
            <h2 id={style.h2}>
              Testnet Guide & Faucet <BsIcons.BsArrowRight id={style.icon} />
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStartedNav;
