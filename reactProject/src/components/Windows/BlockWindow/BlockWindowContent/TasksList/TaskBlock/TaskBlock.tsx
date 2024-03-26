import { useState } from "react";
import ActionMenu from "../../../../../genericClasses/ActionMenu/ActionMenu";
import "./TaskBlock.css";

const TaskBlock = (props: any) => {
  const [isActionMenuOpen, setActionMenuOpen] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const handleClick = () => {
    props.setSimpleTaskWindowActive(true);
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
        {props.data.name}
      </div>
      <button className="TaskBlockButton">
        <div
          onClick={(e) => {
            setActionMenuOpen(true);
            setLeftPosition(e.clientX);
            setTopPosition(e.clientY);
          }}
          className="ActionButton"
        >
        </div>
      </button>
    </div>
  );
};

export default TaskBlock;
