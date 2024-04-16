import { useState } from "react";
import ActionMenu from "../../../../../genericClasses/ActionMenu/ActionMenu";
import "./TaskBlock.css";

const TaskBlock = (props: any) => {
  const handleClick = () => {
    if (props.isShaffledTasks === true) {
      alert("Вы не сохранили изменения в списке задач!");
      return;
    }
    props.setSimpleTaskWindowActive(true);
    props.setDeleteID(props.data.id);
  };
  return (
    <div
      className="TaskBlockObject"
      onDragStart={(e) => props.dragStart(e, props.data)}
      onDragLeave={(e) => props.dragEnd(e)}
      onDragEnd={(e) => props.dragEnd(e)}
      onDragOver={(e) => props.dragOver(e)}
      onDrop={(e) => props.drop(e, props.data)}
      draggable={true}
    >
      <div onClick={handleClick} className="TaskBlock">
        Задание № {props.data.task_num + 1}
      </div>
      <button className="TaskBlockButton">
        <img
          src={`${process.env.PUBLIC_URL}/img/ActionButton.svg`}
          alt=""
          onClick={(e) => {
            props.setActionMenuOpen(true);
            props.setLeftPosition(e.clientX);
            props.setTopPosition(e.clientY);
            props.setDeleteID(props.data.id);
          }}
          className="ActionButton"
        />
      </button>
    </div>
  );
};

export default TaskBlock;
