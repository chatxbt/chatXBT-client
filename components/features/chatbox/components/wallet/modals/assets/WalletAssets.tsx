import { liveSearch } from "@chatxbt-sdk/utils";
import style from "@styles/chat/modal.module.scss";
import React from "react";
import Image from "next/image";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

const WalletAssets = ({ nextStep, closeModal, title }: any) => {
  const { query, selected, setSelected, handleChange, filtered } =
    liveSearch.default();
  return (
    <>
      <div className={style.liveSearchDiv}>
        <div className={style.top}>
          <h1>{title}</h1>
          <span className={style.close} onClick={closeModal}>
            <MdIcons.MdOutlineClose />
          </span>
        </div>
        <div id={style.searchBar}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter asset name or contract address"
          />
          <BsIcons.BsSearch id={style.icon} />
        </div>

        <div id={style.assets}>
          {filtered.map((data: any, index: any) => {
            let active = selected === data.title;
            return (
              <div
                className={style.card}
                key={index}
                onClick={() => setSelected(data.title)}
                id={active ? style.active : ""}
              >
                <div id={style.div1}>
                  <img src={`${data.icon}`} alt="" />
                  <div>
                    <h3>{data.title}</h3>
                    <p>
                      {data.price} <span>{data.profit}</span>
                    </p>
                  </div>
                </div>
                <div id={style.div2}>
                  <h2>
                    {data.balance} {data.initial}
                  </h2>
                  <p>{data.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={nextStep}>Select</button>
      </div>
    </>
  );
};

export default WalletAssets;
