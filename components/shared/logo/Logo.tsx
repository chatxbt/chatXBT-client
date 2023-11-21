import Link from "next/link";
import Image from "next/image";
import React from "react";
import style from "@styles/nav/index.module.scss";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <div className={`${style.logo}`}>
          <img src="/images/logo/logo-alt.png" alt="" />
          <span>Alpha</span>
        </div>
      </Link>
    </>
  );
};

export default Logo;
