import Link from "next/link";
import { useRouter } from "next/router";
import style from "@styles/chat/layout.module.scss";
import { chatLinks, socials } from "./data";
import LogoTwo from "@components/shared/logo/LogoTwo";

const ChatBoxSidebar = () => {
  const router = useRouter();
  const handleClick = (url: any) => router.push(url);
  return (
    <div className={style.sidebar}>
      <div className="container" id={style.con}>
        <div className={style.header}>
          <LogoTwo />
        </div>
        <ul className={`navbar-nav`}>
          {chatLinks.map((data: any) => {
            const active = router.asPath === data.href;
            return (
              <li className={`nav-item`} key={data.title}>
                <button
                  onClick={() => handleClick(data.href)}
                  className={active ? style.active : ""}
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
