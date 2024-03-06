import React from "react";
import style from "@styles/coming-soon/index..module.scss";

const ComingSoon = () => {
  return (
    <div className={style.divCon}>
      <h1>Activity</h1>
      <p>
        Ready to take action? Explore our range of DeFi services and features,
        including swapping, borrowing, wallet management, and more. Begin your
        DeFi journey today and unlock the full potential of decentralized
        finance.
      </p>
      {/* <p>
        Gain insights into your DeFi journey and monitor the status of your
        transactions in real-time.
      </p> */}
    </div>
  );
};

export default ComingSoon;
