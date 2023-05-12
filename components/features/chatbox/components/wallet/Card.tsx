import React from "react";
import style from "@styles/chat/wallet.module.scss";

const Card = ({ title, data }: any) => {
  return (
    <>
      {title !== "Chains" && (
        <div id={style.cards}>
          <h3>{title}</h3>
          <p>{data}</p>
        </div>
      )}

      {title === "Chains" && (
        <div id={style.cardLast}>
          <button>{title}</button>
        </div>
      )}
    </>
  );
};

export default Card;
