import { useState } from "react";
import TaskBlock from "./TaskBlock/TaskBlock";
import ActionMenu from "../../../../genericClasses/ActionMenu/ActionMenu";
// import "./TasksList.css"

const TasksList = (props: any) => {
  console.log(props.tasks)
  const [tasks, setTasks] = useState(props.tasks);

  const [isActionMenuOpen, setActionMenuOpen] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);

  const defaultCard = { id: -1, task_num: -1, name: "f" };

  const [currentCard, setCurrentCard] = useState(defaultCard);

  function dragStartHandler(e: any, task: any) {
    setCurrentCard(task);
  }

  function dragEndHandler(e: any) {
    // e.target.style.background = 'rgb(0, 133, 255)'
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    // e.target.style.background = 'rgb(0, 91, 179)'
  }

  const sortCard = (a: any, b: any) => {
    return a.task_num > b.task_num ? 1 : -1;
  };

  function dropHandler(e: any, TaskBlock: any) {
    e.preventDefault();
    props.setSaveTasksOrderButtonActive(true)
    setTasks(
      tasks.map((c: any) => {
        if (c.id === TaskBlock.id) {
          return { ...c, task_num: currentCard.task_num };
        }
        if (c.id === currentCard.id) {
          return { ...c, task_num: TaskBlock.task_num };
        }
        return c;
      })
    );
  }

  return (
    <div className="TasksList">
      {isActionMenuOpen ? (
          <ActionMenu
            setActionMenuOpen={setActionMenuOpen}
            typeOfActionMenu="Task"
            leftPosition={leftPosition}
            topPosition={topPosition}
            tasks={tasks}
            setTasks={setTasks}
            deleteId={props.deleteId}
          />
        ) : (
          <div></div>
        )}
      {tasks.sort(sortCard).map((task: any) => {
        return (
          <TaskBlock
            data={task}
            key={task.id}
            setSimpleTaskWindowActive={props.setSimpleTaskWindowActive}
            dragStart={dragStartHandler}
            dragEnd={dragEndHandler}
            dragOver={dragOverHandler}
            drop={dropHandler}
            setLeftPosition={setLeftPosition}
            setTopPosition={setTopPosition}
            setActionMenuOpen={setActionMenuOpen}
            setDeleteID={props.setDeleteID}
          />
        );
      })}
    </div>
  );
};

export default TasksList;
