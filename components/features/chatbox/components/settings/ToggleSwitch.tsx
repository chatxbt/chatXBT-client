import React from "react";
import style from "@styles/chat/settings.module.scss";

const ToggleSwitch = ({ label }: any) => {
  return (
    <div className={style.switcher}>
      <div className={style.toggleSwitch}>
        <input
          type="checkbox"
          className={style.checkbox}
          name={label}
          id={label}
        />
        <label className={style.label} htmlFor={label}>
          <span className={style.inner} />
          <span className={style.switch} />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
