import React from "react";
import style from "@styles/coming-soon/index..module.scss";

const ComingSoon = (props: any) => {
  return (
    <div className={style.divCon}>
      <h1>{props.heading}</h1>
      <p>{props.content}</p>
      {/* <p>
        Gain insights into your DeFi journey and monitor the status of your
        transactions in real-time.
      </p> */}
    </div>
  );
};

export default ComingSoon;
