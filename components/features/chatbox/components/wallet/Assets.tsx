import React from "react";
import Image from "next/image";
import style from "@styles/chat/wallet.module.scss";
import { walletHistory } from "./data";

const Assets = () => {
  return (
    <>
      <div className={style.assetsCon}>
        <div className={`table-responsive`}>
          <table className="table table-borderless  table-hover">
            <thead>
              <tr>
                <th id={style.start}>ASSET NAME</th>
                <th>PRICE</th>
                <th>BALANCE</th>
                <th>VALUE</th>
              </tr>
            </thead>
            <tbody>
              {walletHistory.map((data: any, index: any) => (
                <tr key={index}>
                  <td>
                    <div id={style.div}>
                      <Image src={`${data.icon}`} alt="" />
                      <div>
                        <h3>{data.title}</h3>
                        <h4>{data.initial}</h4>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>
                      {data.price} <span>{data.profit}</span>
                    </p>
                  </td>
                  <td>
                    <h2>
                      {data.balance} {data.initial}
                    </h2>
                  </td>
                  <td>
                    <p>{data.value}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div></div>
      </div>


    </>
  );
};

export default Assets;
