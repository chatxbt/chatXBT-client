import React from "react";
import style from "@styles/chat/chat.module.scss";
import { motion } from "framer-motion";
import { useChat } from "@chatxbt-sdk/hooks";
import { highlightAtWords } from "@chatxbt-sdk/utils/ui-formatter-helpers";

const Preview = (props: any) => {
  const {
    store: {},
    action: { setMessage },
  } = useChat(props);

  const previewPrompts = [
    `Swap 0.01 eth for usdt @1inch`,
    `Bridge 0.01 eth to polygon @hop`,
    `What is the current price of bitcoin`,
    `What coins are trending now`,
    `Borrow 0.01 eth @compound`,
    `Can you create a wallet for me`,
    `Explain Defi`,
    `What is the Total Market Cap`,
  ];

  return (
    <motion.div
      className={style.preview}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <h1>Start by typing a prompt, or try entering one of these examples:</h1>
      <div className="row" id={style.row}>
        {previewPrompts.map((data: any, index: any) => (
          <div className="col-md-6" key={index}>
            <div className={style.card} onClick={() => setMessage(data)}>
              <p>{highlightAtWords(data, "#fc7916")}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Preview;
