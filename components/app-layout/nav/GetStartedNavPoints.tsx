import Link from "next/link";
import React from "react";
import style from "@styles/nav/index.module.scss";
import * as BsIcons from "react-icons/bs";
import Logo from "@components/shared/logo/Logo";
import LogoTwo from "@components/shared/logo/LogoTwo";

const GetStartedNavPoints = () => {
  return (
    <div className={style.getStartedNav}>
      <div className="container" id={style.con}>
        <LogoTwo />
      </div>
    </div>
  );
};

export default GetStartedNavPoints;
