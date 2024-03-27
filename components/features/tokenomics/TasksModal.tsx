import React from "react";
import Link from "next/link";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";

const TasksModal = ({ handleTaskModal, taskData, claimReward, index }: any) => {
  return (
    <div className={style.modal}>
      <div className={style.taskModal}>
        <i onClick={handleTaskModal} id={style.close}>
          <MdClose />
        </i>
        <h2>Task {index + 1}</h2>
        <h3>{taskData?.title}</h3>
        <div className={style.notice}>
          <p>{taskData?.description}</p>
        </div>
        <div className={style.button}>
          <button><Link rel="noopener noreferrer" target="_blank" href={taskData?.url}>Execute</Link></button>
          <button onClick={() => claimReward('claim_reward', taskData?.id)}>Claim Reward</button>
        </div>
      </div>
    </div>
  );
};

export default TasksModal;
