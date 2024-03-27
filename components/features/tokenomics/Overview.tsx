import React, { useState } from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { BsArrowUpRight } from "react-icons/bs";
import ReferralModal from "./ReferralModal";
import { useGamify } from "@chatxbt-sdk/hooks";
import { chatxbtServices } from "../../../chatxbt-sdk";
import LoginAlertModal from "./LoginAlertModal";

const Overview = () => {
  const {
    store: {},
    action: {},
  } = useGamify();

  const {
    store: { connected, inAppWallet, userInfo, userRefferals },
  } = chatxbtServices.user({});

  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleTaskModal = () => {
    connected && setOpenModal(!openModal);
    !connected && setOpenLoginModal(!openLoginModal);
  };

  return (
    <>
      {openModal && (
        <ReferralModal userInfo={userInfo} handleTaskModal={handleTaskModal} />
      )}
      {openLoginModal && <LoginAlertModal handleTaskModal={handleTaskModal} />}

      <div className={`container ${style.overview}`}>
        <div className="row">
          <div className="col-md-8">
            <div className={style.card}>
              <h3>ChatXBT Points</h3>
              <h1>
                {inAppWallet?.assets?.pt
                  ? inAppWallet?.assets?.pt?.availableBalance?.toLocaleString()
                  : 0}{" "}
                <span>points</span>
              </h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className={style.card}>
              <h3>Referrals</h3>
              <h1>
                {userRefferals === null ? 0 : userRefferals?.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>
        <div className={style.share}>
          <button onClick={handleTaskModal}>
            Share Referral <BsArrowUpRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Overview;
