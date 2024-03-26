import React from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import { MdClose } from "react-icons/md";

const TasksModal = ({ handleTaskModal }: any) => {
  return (
    <div className={style.modal}>
      <div className={style.taskModal}>
        <i onClick={handleTaskModal} id={style.close}>
          <MdClose />
        </i>
        <h2>Task 1</h2>
        <h3>Comment on this post</h3>
        <div className={style.notice}>
          <p>
            Please make sure to complete the task and claim your rewards. Thank
            you
          </p>
        </div>
        <div className={style.button}>
          <button>Execute</button>
          <button>Claim Reward</button>
        </div>
      </div>
    </div>
  );
};

export default TasksModal;
