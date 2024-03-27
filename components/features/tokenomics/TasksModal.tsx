import React from "react";
import Link from "next/link";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

const TasksModal = ({
  handleTaskModal,
  openModal,
  taskData,
  claimReward,
  index,
}: any) => {
  const listTwo = {
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    hidden: { opacity: 0 },
  };

  return (
    <div className={style.modal}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ type: "linear" }}
        variants={listTwo}
        className={`${style.taskModal} ${openModal ? style.show : style.hide}`}
      >
        <i onClick={handleTaskModal} id={style.close}>
          <MdClose />
        </i>
        <h2>Task {index + 1}</h2>
        <h3>{taskData?.title}</h3>
        <div className={style.notice}>
          <p>{taskData?.description}</p>
        </div>
        <div className={style.button}>
          <button>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={taskData?.url}
            >
              Execute
            </Link>
          </button>
          <button onClick={() => claimReward("claim_reward", taskData?.id)}>
            Claim Reward
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TasksModal;
