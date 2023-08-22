import React from "react";
import style from "@styles/chat/settings.module.scss";
import ToggleSwitch from "./ToggleSwitch";

const Security = () => {
  return (
    <div className={style.security}>
      <h1>Participate in ChatXBT Metrics</h1>
      <p>Participate in ChatXBT Metrics to help us make ChatXBT better </p>
      <ToggleSwitch label={"One"} />
      <h1>Participate in Error Tracing</h1>
      <p>Participate in ChatXBT Metrics to help us make ChatXBT better </p>
      <ToggleSwitch label={"Two"} />
    </div>
  );
};

export default Security;
