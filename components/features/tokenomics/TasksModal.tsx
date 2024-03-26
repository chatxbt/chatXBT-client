import React from "react";
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
          <button>Execute</button>
          <button onClick={claimReward}>Claim Reward</button>
        </div>
      </div>
    </div>
  );
};

export default TasksModal;
