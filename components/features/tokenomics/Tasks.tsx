import React, { useState } from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import TasksModal from "./TasksModal";
import { useGamify } from "@chatxbt-sdk/hooks";

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [taskIndex, setTaskIndex] = useState("");
  const changeModalState = () => setOpenModal(!openModal);
  const handleTaskModal = (index: any) => {
    changeModalState();
    setTaskIndex(index);
  };

  const {
    store: { gamifyTasks, gamifyReferrals, gamifyPoints },
    action: { claimReward },
  } = useGamify();

  return (
    <>
      <div className={`container ${style.tasksCon}`}>
        <h1>ChatXBT Tasks</h1>

        <div className="row">
          {gamifyTasks?.length > 0 &&
            gamifyTasks.map((data: any, index: any) => {
              let taskData = taskIndex === index && data;
              return (
                <>
                  {openModal && taskData && (
                    <TasksModal
                      handleTaskModal={changeModalState}
                      taskData={taskData}
                      claimReward={claimReward}
                      index={index}
                    />
                  )}
                  <div className="col-md-4" key={index} id={style.col}>
                    <div
                      className={style.taskCard}
                      onClick={() => handleTaskModal(index)}
                    >
                      <h2>Task {index + 1}</h2>
                      <p>{data.title}</p>
                      <button>{data.reward} POINTS</button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Tasks;
