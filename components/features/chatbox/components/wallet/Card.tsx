import React from "react";
import style from "@styles/chat/wallet.module.scss";

const Card = ({ title, data, address }: any) => {
  return (
    <>
      <div id={style.desktop}>
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
      </div>
      <div id={style.mobile}>
        {title === "Total Assets" && (
          <div id={style.cards}>
            <h3>{title}</h3>
            <p>{data}</p>
          </div>
        )}

        {title === "Chains" && (
          <div id={style.cardLast}>
            <p>{address}</p>
            <button>{title}</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
