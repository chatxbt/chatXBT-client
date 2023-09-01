import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const TrendingCoins = (props: any) => {
  // dummy data
  const coinData = {
    icon: "/images/chat/bot.png",
    name: `Coin 1`,
    Symbol: `Coin 1`,
    price: 3453454,
    _24h: 34,
    _7d: 34,
    _30d: 34,
    marketCap: 664535478,
    volume: 664535478,
  };

  const dummyCoins = [
    coinData,
    coinData,
    coinData,
    coinData,
    coinData,
    coinData,
  ];

  return (
    <motion.div
      className={style.chatCardBotTrending}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      {/* Bot Icon */}
      <img src={"/images/chat/bot.png"} alt={"Bot Icon"} />

      {/* Main Bot Response */}
      <div className={style.trendCoinsCon}>
        <div className={style.trendCoins}>
          <table className={style.coinList}>
            <TableHead />
            <tbody>
              {dummyCoins.length &&
                dummyCoins?.map((coin, index) => (
                  <tr key={index}>
                    <td className={style.fixed}>
                      <div>
                        <p>{index + 1}</p>
                        <p>
                          <img src={coin.icon} alt={coin.icon} />
                          <span>{coin.name}</span>
                          <span className={style.gray}>{coin.Symbol}</span>
                        </p>
                      </div>
                    </td>
                    <td>
                      <p>
                        $
                        {coin.price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </td>
                    <td
                      style={{ color: coin._24h > 0 ? "#16c784" : "#f7414a" }}
                    >
                      <p>
                        {coin._24h > 0 ? <FaCaretUp /> : <FaCaretDown />}
                        {coin._24h.toFixed(2)}%
                      </p>
                    </td>
                    <td style={{ color: coin._7d > 0 ? "#16c784" : "#f7414a" }}>
                      <p>
                        {coin._7d > 0 ? <FaCaretUp /> : <FaCaretDown />}
                        {coin._7d.toFixed(2)}%
                      </p>
                    </td>
                    <td
                      style={{ color: coin._30d > 0 ? "#16c784" : "#f7414a" }}
                    >
                      <p>
                        {coin._30d > 0 ? <FaCaretUp /> : <FaCaretDown />}
                        {coin._30d.toFixed(2)}%
                      </p>
                    </td>
                    <td>
                      <p>${coin.marketCap.toLocaleString()}</p>
                    </td>
                    <td>
                      <p>${coin.volume.toLocaleString()}</p>
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
        <p> price</p>
      </th>
      <th>
        <p> 24h</p>
      </th>
      <th>
        <p> 7d</p>
      </th>
      <th>
        <p> 30d</p>
      </th>
      <th>
        <p> market cap</p>
      </th>
      <th>
        <p> volume(24h)</p>
      </th>
    </tr>
  </thead>
);

export default TrendingCoins;
