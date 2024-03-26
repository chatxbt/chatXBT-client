import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { BsArrowUpRight } from "react-icons/bs";

const Overview = () => {
  return (
    <div className={`container ${style.overview}`}>
      <div className="row">
        <div className="col-md-8">
          <div className={style.card}>
            <h3>ChatXBT Points</h3>
            <h1>
              0 <span>points</span>
            </h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className={style.card}>
            <h3>Referrals</h3>
            <h1>0</h1>
          </div>
        </div>
      </div>
      <div className={style.share}>
        <button>Share Referral <BsArrowUpRight /></button>
      </div>
    </div>
  );
};

export default Overview;
