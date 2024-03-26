import Link from "next/link";
import React from "react";
import style from "@styles/nav/index.module.scss";
import * as BsIcons from "react-icons/bs";
import Logo from "@components/shared/logo/Logo";
import LogoTwo from "@components/shared/logo/LogoTwo";
import { chatxbtServices } from "../../../chatxbt-sdk"

const GetStartedNavPoints = ({ store: { connected }, action: { getTwitterAccess } }: any) => {
  return (
    <div className={style.getStartedNav}>
      <div className="container" id={style.con}>
        <LogoTwo />
        {!connected && <div id={style.details} onClick={() => getTwitterAccess()}>
          {/* <h2>new to chatFi? </h2> */}
          <span>
            <h2 id={style.h2}>
              Connect Twitter <BsIcons.BsArrowRight id={style.icon} />
            </h2>
          </span>
        </div>}
      </div>
    </div>
  );
};

export default (props: any) => <GetStartedNavPoints {...props} {...chatxbtServices.auth(props)} />;
