import Link from "next/link";
import { useRouter } from "next/router";
import style from "@styles/chat/layout.module.scss";
import { chatLinks, socials } from "./data";
import LogoTwo from "@components/shared/logo/LogoTwo";
import { useEffect, useState } from "react";

const ChatBoxSidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const checkRoutePath = (href: any) => {
    router.asPath === href && setActive(href);
    href === '/dashboard/chat' && setActive(href);
  };
  const handleClick = (url: any) => {
    router.push(url);
    checkRoutePath(url);
  };

  useEffect(() => {
    let url = router.asPath;
    url === "/" ? checkRoutePath("/dashboard/chat") : checkRoutePath(url);
  }, []);

  return (
    <div className={style.sidebar}>
      <div className="container" id={style.con}>
        <div className={style.header}>
          <LogoTwo />
        </div>
        <ul className={`navbar-nav`}>
          {chatLinks.map((data: any) => {
            return (
              <li className={`nav-item`} key={data.title}>
                <button
                  onClick={() => handleClick(data.href)}
                  className={active === data.href ? style.active : ""}
                >
                  <i>{data.icon}</i>
                  <p>{data.title}</p>
                </button>
              </li>
            );
          })}
        </ul>
        <div className={style.socialCon}>
          <h3>Follow us:</h3>
          <div className={style.icons}>
            {socials.map((data: any, index: any) => (
              <Link href={data.href} key={index}>
                <i>{data.icon}</i>
              </Link>
            ))}
          </div>
          <div className={style.btn}>
            <button>Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxSidebar;
