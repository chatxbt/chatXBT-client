import React from "react";
import style from "@styles/chat/settings.module.scss";

const General = () => {
  return (
    <div className={style.general}>
      <h1>Choose the currency for market value</h1>
      <select name="" id="">
        <option value="">USD - US Dollars</option>
      </select>
    </div>
  );
};

export default General;
