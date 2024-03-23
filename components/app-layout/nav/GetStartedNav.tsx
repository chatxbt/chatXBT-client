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
          <h2>Already have an account? </h2>
          <Link href={"#"}>
            <h2 id={style.h2}>
              Login <BsIcons.BsArrowRight id={style.icon} />
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStartedNav;
