import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";
import useCopyToClipboard from "@chatxbt-sdk/utils/copy-clipboard";
import * as IoIcons2 from "react-icons/io5";
import { chatxbtConfig } from "@chatxbt-sdk/index";
import { motion } from "framer-motion";

const ReferralModal = ({ userInfo, openModal, handleTaskModal }: any) => {
  const { isCopied, handleCopy, copiedData } = useCopyToClipboard();
  const referral_code =
    chatxbtConfig.envConfig.referralUrl + userInfo?.username;

  const listTwo = {
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    hidden: { opacity: 0 },
  };

  return (
    <div className={style.modal}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ type: "linear" }}
        variants={listTwo}
        className={`${style.taskModal} ${openModal ? style.show : style.hide}`}
      >
        <i onClick={handleTaskModal} id={style.close}>
          <MdClose />
        </i>
        <h3>Share referral link</h3>
        <div className={style.notice}>
          <ul>
            <li>
              <p>
                You get 50 points for each referral as well as the person
                referred
              </p>
            </li>
            <li>
              <p>
                If the person referred, refers another person you get 15 points
              </p>
            </li>
          </ul>
        </div>
        <button id={style.copy} onClick={() => handleCopy(referral_code)}>
          {isCopied && copiedData === referral_code ? (
            <>
              Referral Link Copied{" "}
              <IoIcons2.IoCopy className={style.iconCopy} />
            </>
          ) : (
            <>
              Copy Referral Link{" "}
              <IoIcons2.IoCopyOutline className={style.iconCopy} />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default ReferralModal;
