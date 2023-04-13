import React from "react";
import style from "@styles/home/index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import * as MdIcons from "react-icons/md";
import Link from "next/link";
import { socialIcons } from "@components/app-layout/nav/data";

const Alert = (props: any) => {
  const {
    store: { message, loading, error },
    action: { closeMessage, closeError },
  } = props;

  return (
    <>
      {message && !loading && (
        <div className={style.overlay}>
          <div className={style.notificationCon}>
            <motion.div
              className={style.success}
              initial={{ opacity: 0, y: 150, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <motion.button onClick={closeMessage} id={style.close}>
                <MdIcons.MdOutlineClose />
              </motion.button>
              <h2>You have joined the waitlist!!!</h2>
              <p>
                Your request to join the waitlist was successful. You will be
                notified when ChatXBT launches. Join our community
              </p>
              <div className={style.icons}>
                {socialIcons.map((data: any, index: any) => (
                  <Link href={`${data.url}`} key={index}>
                    <a target="_blank">
                      <button>
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
                        <p>Join {data.name}</p>
                      </button>
                    </a>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className={style.overlay}>
          <div className={style.notificationCon}>
            <ul>
              <AnimatePresence initial={false}>
                {error && !loading && (
                  <motion.li
                    initial={{ opacity: 0, y: 150, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div>
                      <h3 id={style.error}>{error}</h3>
                    </div>

                    <motion.button onClick={closeError}>
                      <MdIcons.MdOutlineClose />
                    </motion.button>
                  </motion.li>
                )}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
