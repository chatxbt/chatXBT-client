import Link from "next/link";
import Image from "next/image";
import React from "react";
import style from "@styles/nav/index.module.scss";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <div className={`${style.logo}`}>
          <Image src="/images/logo/logo-alt.png" alt="" />
        </div>
      </Link>
    </>
  );
};

export default Logo;
