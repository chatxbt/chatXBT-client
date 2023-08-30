import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const TrendingCoins = (props: any) => {
  // dummy data
  const dummyCoins = [];

  for (let i = 1; i <= 31; i++) {
    const min = 5000000;
    const max = 1000000000;

    const coinData = {
      icon: "/images/chat/eth.png",
      name: `Coin ${i}`,
      Symbol: `Coin ${i}`,
      price: Math.random() * 100000,
      _24h: Math.random() * 201 - 100,
      _7d: Math.random() * 201 - 100,
      _30d: Math.random() * 201 - 100,
      marketCap: Math.floor(Math.random() * (max - min + 1) + min),
      volume: Math.floor(Math.random() * (max - min + 1) + min),
    };

    dummyCoins.push(coinData);
  }

  return (
    <motion.div
      className={style.trendCoinsCon}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div className={style.trendCoins}>
        <table className={style.coinList}>
          <thead>
            <tr>
              <th className={style.fixed} colSpan={2}>
                <div>
                  <p>#</p>
                  <p>Name</p>
                </div>
              </th>
              <th>price</th>
              <th>24h</th>
              <th>7d</th>
              <th>30d</th>
              <th>market cap</th>
              <th>volume(24h)</th>
            </tr>
          </thead>
          <tbody>
            {dummyCoins?.map((coin, index) => (
              <tr key={index}>
                <td className={style.fixed} colSpan={2}>
                  <div>
                    <p>{index + 1}</p>
                    <p>
                      <Image
                        src={coin.icon}
                        width={20}
                        height={20}
                        alt={coin.icon}
                      />
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
                <td style={{ color: coin._24h > 0 ? "#16c784" : "#f7414a" }}>
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
                <td style={{ color: coin._30d > 0 ? "#16c784" : "#f7414a" }}>
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
    </motion.div>
  );
};

export default TrendingCoins;
