import React, { useState } from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import TasksModal from "./TasksModal";
import { useGamify } from "@chatxbt-sdk/hooks";
import { chatxbtServices } from "../../../chatxbt-sdk";
import LoginAlertModal from "./LoginAlertModal";

const Tasks = () => {
  const {
    store: { gamifyTasks },
  } = useGamify();

  const {
    store: { connected, twitterAuth},
    action: { getTwitterAccess },
  } = chatxbtServices.auth({});

  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [taskIndex, setTaskIndex] = useState("");
  const changeModalState = () => {
    connected && setOpenModal(!openModal);
    !connected && setOpenLoginModal(!openLoginModal);
  };
  const handleTaskModal = (index: any) => {
    changeModalState();
    setTaskIndex(index);
  };

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
                      claimReward={getTwitterAccess}
                      index={index}
                      openModal={openModal}
                    />
                  )}

                  {openLoginModal && (
                    <LoginAlertModal
                      openLoginModal={openLoginModal}
                      handleTaskModal={handleTaskModal}
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
