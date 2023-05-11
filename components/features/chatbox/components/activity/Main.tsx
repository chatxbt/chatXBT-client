import React from "react";
import style from "@styles/chat/activity.module.scss";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import { activityData } from "./data";
import Link from "next/link";
import { activityChecker } from "@chatxbt-sdk/utils";

const Main = () => {
  return (
    <div className={style.activityCon}>
      <div className={style.header}>
        <h1>Transactions</h1>
        <MdIcons.MdOutlineFileDownload id={style.icon} />
      </div>
      <div className={style.actBox}>
        {activityData.map((data: any, index: any) => {
          return (
            <div id={style.section}>
              <h2>{data.timeStamp}</h2>
              {data.data.map((actData: any, index: any) => (
                <div id={style.card} key={index}>
                  <div>
                    <h4>{actData.type}</h4>
                    <i id={style.type}>
                      {activityChecker
                        .default()
                        .checkActivityType(actData.type)}
                    </i>
                  </div>

                  <div>
                    <h4>From</h4>
                    <p>{actData.from}</p>
                  </div>

                  <div>
                    <h4>To</h4>
                    <p>{actData.to}</p>
                  </div>

                  <div id={style.div}>
                    <h3>{actData.status}</h3>
                    <i id={style.status}>
                      {activityChecker.default().checkStatus(actData.status)}
                    </i>
                  </div>

                  <div id={style.div}>
                    <Link href={`${actData.url}`}>
                      <BsIcons.BsBoxArrowUpRight id={style.share} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
