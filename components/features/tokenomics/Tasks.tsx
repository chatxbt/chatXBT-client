import React, { useState } from "react";
import style from "@styles/tokenomics/tokenomics.module.scss";
import TasksModal from "./TasksModal";

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleTaskModal = () => setOpenModal(!openModal);
  return (
    <>
      {openModal && <TasksModal handleTaskModal={handleTaskModal} />}
      <div className={`container ${style.tasksCon}`}>
        <h1>ChatXBT Tasks</h1>

        <div className="row">
          <div className="col-md-4">
            <div className={style.taskCard} onClick={handleTaskModal}>
              <h2>Task 1</h2>
              <p>Comment on this post</p>
              <button>20 POINTS</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className={style.taskCard} onClick={handleTaskModal}>
              <h2>Task 1</h2>
              <p>Comment on this post</p>
              <button>20 POINTS</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className={style.taskCard} onClick={handleTaskModal}>
              <h2>Task 1</h2>
              <p>Comment on this post</p>
              <button>20 POINTS</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className={style.taskCard}>
              <h2>Task 1</h2>
              <p>Comment on this post</p>
              <button>20 POINTS</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className={style.taskCard}>
              <h2>Task 1</h2>
              <p>Comment on this post</p>
              <button>20 POINTS</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className={style.taskCard}>
              <h2>Task 1</h2>
              <p>Comment on this post</p>
              <button>20 POINTS</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
