import React from "react";
import style from "@styles/chat/settings.module.scss";
import { supportLinks } from "./data";
import Link from "next/link";

const Support = () => {
  return (
    <div className={style.support}>
      <h1>Chat XBT</h1>
      <h4>Version 1.0</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis totam
        distinctio, aperiam earum dolores quas tempore voluptatem, autem sit
        laboriosam ut? Quisquam quod dolorem repellendus facilis obcaecati
        quaerat impedit culpa?
      </p>

      <ul className={`navbar-nav`}>
        {supportLinks.map((data: any, index: any) => (
          <li key={index} className={`nav-item`}>
            <Link href={data.url}>{data.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Support;
