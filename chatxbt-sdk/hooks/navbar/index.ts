import debounce from "../../utils/debounce";
import { useEffect, useState } from "react";

export const useNavbarUi = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navbarStyles: any = {
    // position: 'fixed',
    height: "100px",
    // width: '100%',
    transition: "top 0.6s",
    // border: '1px solid red'
  };

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return {
    navbarStyles,
    visible,
  };
};
