import React from "react";
import style from "@styles/coming-soon/index..module.scss";
import * as RiIcons from "react-icons/ri";
import { IoSparklesSharp } from "react-icons/io5";

const ComingSoon = (props: any) => {
  return (
    <div className={style.divCon}>
      <div className={style.main}>
        <i>
          <IoSparklesSharp />
        </i>
        <div>
          <h1>{props.heading}</h1>
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
