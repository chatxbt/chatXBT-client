import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";
import useCopyToClipboard from "@chatxbt-sdk/utils/copy-clipboard";
import * as IoIcons2 from "react-icons/io5";
import { chatxbtConfig } from "@chatxbt-sdk/index";

const ReferralModal = ({ userInfo, handleTaskModal }: any) => {
  const { isCopied, handleCopy, copiedData } = useCopyToClipboard();
  const referral_code =
    chatxbtConfig.envConfig.referralUrl + userInfo?.username;

  return (
    <div className={style.modal}>
      <div className={style.taskModal}>
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
      </div>
    </div>
  );
};

export default ReferralModal;
