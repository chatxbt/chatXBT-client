import React from "react";
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

const ChatCardPrice = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        fill: true,
        label: " ",
        data: [12, 19, 42, 5, 27, 21, 30],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.1)",
        borderWidth: 1,
        lineTension: 0.3,
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
      <img src={botDisplayImage.default} alt="" />

      <div className={style.message}>
        <h5>
          Market Summary {`>`} <span>Bitcoin</span>
        </h5>

        {/* if the price drops programmatically add className of fall else add rise */}
        <h1>
          21,151,078.31 <span>USD</span>
        </h1>
        <h4>−259,549.92 (1.21%) today</h4>
        <div className={style.chat}>
          <Line options={options} data={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCardPrice;
