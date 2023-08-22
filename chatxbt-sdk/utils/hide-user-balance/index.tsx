import { useEffect, useState } from "react";
import * as RxIcons from "react-icons/rx";
import * as FaIcons from "react-icons/fa";

export default () => {
  const [hide, setHide] = useState<boolean>(false);
  const dots = "**********";
  const handleHide = () => {
    setHide(!hide);
    localStorage.setItem("hideUserBalance", String(hide));
  };

  const icons = {
    hide: <FaIcons.FaRegEye />,
    show: <RxIcons.RxEyeClosed />,
  };

  useEffect(() => {
    let status = localStorage.getItem("hideUserBalance");
    if (status) {
      status === "true" ? setHide(true) : setHide(false);
    } else {
      setHide(false);
    }
  }, []);

  return { handleHide, hide, dots, icons };
};
