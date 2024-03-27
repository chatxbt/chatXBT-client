import React from "react";
import style from "@styles/footer/index.module.scss";
import Logo from "@components/shared/logo/Logo";
import Link from "next/link";
import { socialIcons } from "../nav/data";

const Footer = () => {
  return (
    <div className={`container-fluid ${style.footerGamify}`}>
      <div className="container" id={style.con}>
        <div className="row" id={style.row}>
          <div className="col-md-6">
            <Logo />
            <h4>Unlock the possibilities of web3 with AI</h4>
            <h5>{new Date().getFullYear()} ChatXBT, Inc</h5>
          </div>
          <div className="col-md-6">
            <div id={style.bottom}>
              <div id={style.socials}>
                {socialIcons.map((data: any, index: any) => (
                  <Link href={`${data.url}`} key={index} legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      <i>{data.icon}</i>
                    </a>
                  </Link>
                ))}
              </div>
              <p>Team[at]chatxbt.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
