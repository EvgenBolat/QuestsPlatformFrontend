import { useState } from "react";
import TaskBlock from "./TaskBlock/TaskBlock";
// import "./TasksList.css"

const TasksList = (props: any) => {
  const [tasks, setTasks] = useState(props.tasks);

  const defaultCard = { id: -1, order: -1, name: "f" };

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
    return a.order > b.order ? 1 : -1;
  };

  function dropHandler(e: any, TaskBlock: any) {
    e.preventDefault();
    props.setSaveTasksOrderButtonActive(true)
    setTasks(
      tasks.map((c: any) => {
        if (c.id === TaskBlock.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: TaskBlock.order };
        }
        return c;
      })
    );
  }

  return (
    <div className="TasksList">
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
          />
        );
      })}
    </div>
  );
};

export default TasksList;
