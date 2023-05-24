import React from "react";
import style from "@styles/chat/wallet.module.scss";
import { hideBalance } from "@chatxbt-sdk/utils";

const Card = ({ title, data, address }: any) => {
  const { handleHide, hide, dots, icons } = hideBalance.default();
  return (
    <>
      <div id={style.desktop}>
        {title === "Total Assets" && (
          <div id={style.cardsFirst}>
            <div>
              <h3>{title}</h3>
              <p>{hide ? dots : data}</p>
            </div>
            <button onClick={handleHide}>
              {hide ? icons.hide : icons.show}
            </button>
          </div>
        )}

        {title === "Wallet address" && (
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
            <div>
              <h3>{title}</h3>
              <p>{hide ? dots : data}</p>
            </div>
            <button onClick={handleHide}>
              {hide ? icons.hide : icons.show}
            </button>
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
