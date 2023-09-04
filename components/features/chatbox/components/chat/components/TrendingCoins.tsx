import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const TrendingCoins = (props: any) => {
  const { dummyCoins, dp } = props;

  return (
    <motion.div
      className={style.chatCardBotTrending}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      {/* Bot Icon */}
      <img src={dp} alt={"Bot Icon"} />

      {/* Main Bot Response */}
      <div className={style.trendCoinsCon}>
        <div className={style.trendCoins}>
          <table className={style.coinList}>
            <TableHead />
            <tbody>
              {dummyCoins?.map((coin: any, index: any) => (
                <tr key={index + 1}>
                  <td className={style.fixed}>
                    <div>
                      <p>{index + 1}</p>
                      <p>
                        <Image
                          src={coin?.item?.large}
                          width={17}
                          height={17}
                          alt={coin?.item?.small}
                        />
                        <span className={style.gray}>{coin?.item?.symbol}</span>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>$ {coin?.item?.price_btc.toFixed(7)}</p>
                  </td>
                  <td>
                    <p>{coin?.item?.market_cap_rank}</p>
                  </td>
                  <td>
                    <p>{coin?.item?.score}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const TableHead = () => (
  <thead>
    <tr>
      <th className={style.fixed}>
        <div>
          <p>#</p>
          <p>Name</p>
        </div>
      </th>
      <th>
        <p> Price</p>
      </th>
      <th>
        <p>Market Rank</p>
      </th>
      <th>
        <p>Score</p>
      </th>
    </tr>
  </thead>
);

export default TrendingCoins;
