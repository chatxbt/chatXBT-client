import Link from "next/link";
import React from "react";
import style from "@styles/nav/index.module.scss";

const LogoTwo = () => {
    return (
        <>
          <Link href={"/"}>
            <div className={`${style.logoWhite}`}>
              <img src="/images/logo/logo-white1.png" alt="" />
            </div>
          </Link>
        </>
      );
}

export default LogoTwo