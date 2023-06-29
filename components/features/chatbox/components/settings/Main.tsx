import { useWalletTabControl } from "@chatxbt-sdk/hooks";
import React from "react";
import TabComponent from "../wallet/tab/TabComponent";
import style from "@styles/chat/settings.module.scss";
import TabRenderer from "../wallet/tab/TabRenderer";
import { tabLinks } from "./data";
import General from "./General";
import AiActions from "./AiActions";
import Support from "./Support";
import Security from "./Security";

const Main = () => {
  let page = "settings";
  const { handleSelect, selected } = useWalletTabControl(page, tabLinks);

  return (
    <div className={style.settingsCon}>
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
          <TabRenderer isSelected={selected === "General"}>
            <>
              <General />
            </>
          </TabRenderer>
          <TabRenderer isSelected={selected === "AI Actions"}>
            <>
              <AiActions />
            </>
          </TabRenderer>
          <TabRenderer isSelected={selected === "Support"}>
            <>
              <Support />
            </>
          </TabRenderer>
          <TabRenderer isSelected={selected === "Security & Privacy"}>
            <>
              <Security />
            </>
          </TabRenderer>
        </TabComponent>
      </>
    </div>
  );
};

export default Main;
