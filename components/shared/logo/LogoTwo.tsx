import Link from "next/link";
import React from "react";
import Image from "next/image";
import style from "@styles/nav/index.module.scss";

const LogoTwo = () => {
    return (
        <>
          <Link href={"/"}>
            <div className={`${style.logoWhite}`}>
              <img src="/images/logo/logo-white1.png" alt="" />
              <span>Alpha</span>
            </div>
          </Link>
        </>
      );
}

export default LogoTwo