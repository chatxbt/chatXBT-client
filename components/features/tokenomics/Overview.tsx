import React, { useState } from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { BsArrowUpRight } from "react-icons/bs";
import ReferralModal from "./ReferralModal";

const Overview = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleTaskModal = () => setOpenModal(!openModal);
  return (
    <>
      {openModal && <ReferralModal handleTaskModal={handleTaskModal} />}

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
          <button onClick={handleTaskModal} id={style.x}>
            Connect X
          </button>
          <button onClick={handleTaskModal}>
            Share Referral <BsArrowUpRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Overview;
