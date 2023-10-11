import React from "react";
import Image from "next/image";
import style from "@styles/chat/wallet.module.scss";
import { tabLinks, walletHistory } from "./data";
import TabComponent from "./tab/TabComponent";
import TabRenderer from "./tab/TabRenderer";
import Assets from "./Assets";
import Collections from "./Collections";
import { useWalletTabControl } from "@chatxbt-sdk/hooks";

const Body = () => {
  let page = "wallet";
  const { handleSelect, selected } = useWalletTabControl(page, tabLinks);

  return (
    <>
      <div className={style.body}>
        <>
          <TabComponent
            tabs={tabLinks}
            selected={selected}
            setSelected={handleSelect}
            classNameHeader={style.headerTab}
            classNameMainContainer={style.main}
            classNameTabContainer={style.mainTab}
            classNameActive={style.active}
            classNameAdd={style.add}
            id={style.btnSec}
          >
            <TabRenderer isSelected={selected === "Assets"}>
              <>
                <Assets />
              </>
            </TabRenderer>
            <TabRenderer isSelected={selected === "Collections"}>
              <>
                <Collections />
              </>
            </TabRenderer>
          </TabComponent>
        </>
      </div>
      <div className={style.assetConMobile}>
        {walletHistory.map((data: any, index: any) => (
          <div className={style.card} key={index}>
            <div id={style.div1}>
              <Image src={`${data.icon}`} alt="" />
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
        ))}
      </div>
    </>
  );
};

export default Body;
