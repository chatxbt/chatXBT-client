import Link from "next/link";
import React from "react";
import style from "@styles/nav/index.module.scss";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <div className={`${style.logo}`}>
          <img src="/images/logo/logo-alt.png" alt="" />
        </div>
      </Link>
    </>
  );
};

export default Logo;
