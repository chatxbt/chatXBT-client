import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";

export default () => {
  const checkActivityType = (param: string) => {
    if (param === "Sent") return <BsIcons.BsArrowUpRight />;
    if (param === "Swapped") return <BsIcons.BsArrowRepeat />;
    if (param === "Received") return <BsIcons.BsArrowDownLeft />;
    if (param === "Stacked") return <GiIcons.GiTwoCoins />;
    if (param === "Lend") return <RiIcons.RiHandCoinLine />;
  };

  const checkStatus = (param: string) => {
    if (param === "Pending")
      return <BsIcons.BsDashCircle style={{ color: "#BA5B03" }} />;
    if (param === "Failed")
      return <AiIcons.AiOutlineCloseCircle style={{ color: "#BA0303" }} />;
    if (param === "Successful")
      return <BsIcons.BsCheckCircle style={{ color: "#058F58" }} />;
  };

  return {
    checkActivityType,
    checkStatus,
  };
};
