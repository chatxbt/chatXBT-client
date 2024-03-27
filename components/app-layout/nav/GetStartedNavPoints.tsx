import Link from "next/link";
import React from "react";
import style from "@styles/nav/index.module.scss";
import * as BsIcons from "react-icons/bs";
import Logo from "@components/shared/logo/Logo";
import LogoTwo from "@components/shared/logo/LogoTwo";
import { chatxbtServices } from "../../../chatxbt-sdk";

const GetStartedNavPoints = ({
  store: { connected },
  action: { getTwitterAccess, signOut },
}: any) => {
  return (
    <div className={style.getStartedNavGamify}>
      <div className="container" id={style.con}>
        <LogoTwo />
        {!connected && (
          <button onClick={() => getTwitterAccess()} id={style.x}>
            Connect X
          </button>
        )}
        {connected && (
          <button onClick={() => signOut()} id={style.x}>
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default (props: any) => (
  <GetStartedNavPoints {...props} {...chatxbtServices.auth(props)} />
);
