import { useState } from "react";
import TasksBlock from "../Blocks/TasksBlock/TasksBlock";
import "./CreationBlockMenu.css";

const CreationBlocksMenu = (props: any) => {
  const [isOpen, ChangeOpened] = useState(false);

  function dragStartHandler(e: any, taskBlock: any) {
  }
  
  function dragEndHandler(e: any) {
  }
  
  function dragOverHandler(e: any) {
  }
  
  function dropHandler(e: any, TasksBlock: any) {
    e.preventDefault()
  }

  return (
    <div className="CreationMenu" style={!isOpen ? { right: -120 } : {}}>
      <img
        onClick={(e) => {
          ChangeOpened(!isOpen);
        }}
        className={isOpen ? "OpenedArrow" : "ClosedArrow"}
        src={`${process.env.PUBLIC_URL}/img/OpenedCreationBlockArrow.svg`}
        alt="fff"
      />
      <div className="CreationMenuBody">
        <div id="CreationMenuHeader">Блоки Задач</div>
        <TasksBlock
          className="Consistent"
          data={{ name: "Название", newBlock: true, id: -1 }}
          dragStart={dragStartHandler}
          dragEnd={dragEndHandler}
          dragOver={dragOverHandler}
          drop={dropHandler}
          last={true}
        />
        <span id="ConsistentName">Последовательный блок</span>
        <TasksBlock
          className="Parallel"
          data={{ name: "Название",  newBlock: true, id: -2 }}
          dragStart={dragStartHandler}
          dragEnd={dragEndHandler}
          dragOver={dragOverHandler}
          drop={dropHandler}
          last={true}
        />
        <span id="ParallelName">Параллельный блок</span>
      </div>
    </div>
  );
};

export default CreationBlocksMenu;
