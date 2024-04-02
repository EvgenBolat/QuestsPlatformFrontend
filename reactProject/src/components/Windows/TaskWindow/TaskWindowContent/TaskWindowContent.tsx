import { useEffect, useState } from "react";
import TaskForm from "./TaskForm/TaskForm";
import "./TaskWindowContent.css";
import TaskWindowHeader from "./TaskWindowHeader/TaskWindowHeader";
import { useParams } from "react-router-dom";

const TaskWindowContent = (props: any) => {
  const { userid } = useParams();
  const [isRequired, setIsRequired] = useState(false);
  const [vital, setVital] = useState(false);
  const [newTask, setNewTask] = useState({
    task_id: "-1",
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
    task_id: "-1",
    task_type: 2,
    task_num: 0,
    state: 0,
    vital: 0,
    description: "",
    question: "",
    answer: "",
    files: [],
    min_points: 1,
    max_points: 1,
    task_time: 30,
  });
  const fetchData = async () => {
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/task/${props.deleteId}`,
      {
        method: "POST",
        body: JSON.stringify({ auth_token: userid }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.status === "OK") {
      setTask(response.message);
      setVital(response.message.vital)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(task)
  },[task])
  if (props.typeOfWindow === "simple") {
    console.log("беды")
    return (
      <div className="TaskWindowContent">
        <TaskWindowHeader
          setIsRequired={setIsRequired}
          typeOfWindow={props.typeOfWindow}
          task_num={task.task_num}
          setTask={setTask}
          task={task}
          vital={vital}
          setVital={setVital}
        />
        <TaskForm
          currentCard={props.currentCard}
          task={task}
          deleteId={props.deleteId}
          typeOfWindow={props.typeOfWindow}
          setTaskWindowActive={props.setTaskWindowActive}
          vital={vital}
        />
      </div>
    );
  } else {
    return (
      <div className="TaskWindowContent">
        <TaskWindowHeader
          task={newTask}
          setTask={setNewTask}
          vital={vital}
          setVital={setVital}
        />
        <TaskForm
          currentCard={props.currentCard}
          tasks={props.tasks}
          setTasks={props.setTasks}
          task={newTask}
          setTask={setNewTask}
          isRequired={isRequired}
          typeOfWindow={props.typeOfWindow}
          setTaskWindowActive={props.setTaskWindowActive}
          vital={vital}
        />
      </div>
    );
  }
};

export default TaskWindowContent;
