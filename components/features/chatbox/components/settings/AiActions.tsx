import React from "react";
import style from "@styles/chat/settings.module.scss";
import { actionsData } from "./data";
import * as BsIcons from "react-icons/bs";

const AiActions = () => {
  return (
    <div className={style.actions}>
      <h1>Supported Protocol</h1>
      <p>Choose a default protocol to perform an action on that protocol</p>

      <div className={style.desktop}>
        <div className={`table-responsive`}>
          <table className="table table-borderless  table-hover">
            <thead>
              <tr>
                <th id={style.start}>Actions</th>
                <th>Default Protocol</th>
                <th>Select Protocol</th>
              </tr>
            </thead>
            <tbody>
              {actionsData.map((data: any, index: any) => (
                <tr key={index}>
                  <td>
                    <h1>{data.title}</h1>
                  </td>
                  <td>
                    <div id={style.card}>
                      <img src={`${data.icon}`} alt="" />
                      <p>{data.name}</p>

                      <i>
                        <BsIcons.BsCheck id={style.icon} />
                      </i>
                    </div>
                  </td>
                  <td>
                    <select name="" id="">
                      <option value="">Or select</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={style.mobile}>
        {actionsData.map((data: any, index: any) => (
          <div className={style.mobileCard} key={index}>
            <h1>{data.title}</h1>
            <div id={style.div}>
              <div id={style.card}>
                <img src={`${data.icon}`} alt="" />
                <p>{data.name}</p>

                <i>
                  <BsIcons.BsCheck id={style.icon} />
                </i>
              </div>
              <select name="" id="">
                <option value="">Or select</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiActions;
