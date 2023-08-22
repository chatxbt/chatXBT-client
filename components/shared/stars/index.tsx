import React from "react";
import style from "@styles/layout/index.module.scss";

const Stars = () => {
  return (
    <>
      <div className={style.backgroundContainer}>
        <div className={style.stars}></div>
      </div>
      <div className={style.mainDivSection}></div>
    </>
  );
};

export default Stars;
