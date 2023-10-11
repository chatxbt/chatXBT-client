import React from "react";
import Image from "next/image";
import style from "@styles/chat/aiprompts.module.scss";
import { motion } from "framer-motion";
import { botDisplayImage } from "@chatxbt-sdk/utils/assets";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler
);

const ChatCardPrice = (props: any) => {
  const { dp, prices } = props;

  const a = prices?.priceHistory.map((data: any) => data[1]);

  const data = {
    labels: [" ", " ", " ", " ", " ", " ", " "],
    datasets: [
      {
        fill: true,
        label: " ",
        data: a,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.1)",
        borderWidth: 1,
        // lineTension: 0.3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <motion.div
      className={style.chatCardBotPrice}
      //   id={`${id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <img src={dp} alt="" />

      <div className={style.message}>
        <h5>
          Market Summary {`>`} <span>{prices?.coin}</span>
        </h5>

        <h1>
          {prices?.priceHistory[0][1]} <span>USD</span>
        </h1>
        <h4>{prices?.mkCapHistory[0][1].toLocaleString()}</h4>
        <div className={style.chat}>
          <Line options={options} data={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCardPrice;
