import { useState } from "react";
import TaskForm from "./TaskForm/TaskForm";
import "./TaskWindowContent.css";
import TaskWindowHeader from "./TaskWindowHeader/TaskWindowHeader";

const TaskWindowContent = (props: any) => {
  const [isRequired, setIsRequired] = useState(false);
  // получаем инфу при помощи     console.log(props.actionMenuData)
  const [newTask, setNewTask] = useState({
    id: "e32",
    task_type: -1,
    task_num: 0,
    state: 0,
    vital: false,
    description: "",
    question: "",
    answer: "",
    files: [],
    min_points: 1,
    max_points: 1,
    task_time: 30,
  });
  const [task, setTask] = useState({
    id: "324",
    task_type: 2,
    task_num: 2,
    state: 2,
    vital: true,
    description: "Найдите эльфа, и получите у него горшочек с золото",
    question: "",
    answer: "jfdfvkkhbsfhv",
    files: [
      `${process.env.PUBLIC_URL}/img/document.svg`,
      `${process.env.PUBLIC_URL}/img/camera.svg`,
      `${process.env.PUBLIC_URL}/img/openedEye.svg`,
    ],
    min_points: 2,
    max_points: 4,
    task_time: 160,
  });
  if (props.typeOfWindow === "simple") {
    return (
      <div className="TaskWindowContent">
        <TaskWindowHeader
          setIsRequired={setIsRequired}
          typeOfWindow={props.typeOfWindow}
          task_num={task.task_num}
          setTask={setTask}
          task={task}
        />
        <TaskForm
          task={task}
          typeOfWindow={props.typeOfWindow}
          setTaskWindowActive={props.setTaskWindowActive}
        />
      </div>
    );
  } else {
    return (
      <div className="TaskWindowContent">
        <TaskWindowHeader task={newTask} setTask={setNewTask} />
        <TaskForm
          tasks={props.tasks}
          setTasks={props.setTasks}
          task={newTask}
          setNewTask={setNewTask}
          isRequired={isRequired}
          typeOfWindow={props.typeOfWindow}
          setTaskWindowActive={props.setTaskWindowActive}
        />
      </div>
    );
  }
};

export default TaskWindowContent;
