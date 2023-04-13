import Link from "next/link";
import React from "react";
import style from "@styles/nav/index.module.scss";
import { socialIcons } from "./data";
import { motion } from "framer-motion";
import Logo from "@components/shared/logo/Logo";

const Navbar = () => {
  return (
    <div className={`container-fluid ${style.nav}`}>
      <div className="container" id={style.con}>
        <Logo />
        <div className={style.icons}>
          {socialIcons.map((data: any, index: any) => (
            <Link href={`${data.url}`} key={index}>
              <a target="_blank">
                <motion.i
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    color: `${data.color}`,
                  }}
                >
                  {data.icon}
                </motion.i>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
