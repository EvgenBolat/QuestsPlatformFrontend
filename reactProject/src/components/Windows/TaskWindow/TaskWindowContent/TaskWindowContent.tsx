import { useState } from "react";
import TaskForm from "./TaskForm/TaskForm";
import "./TaskWindowContent.css";
import TaskWindowHeader from "./TaskWindowHeader/TaskWindowHeader";

const TaskWindowContent = (props: any) => {
  const [isRequired, setIsRequired] = useState(false);
  if (props.typeOfWindow === "simple") {
    // console.log(props.useQuestData()[0][0])
    // console.log(props.useQuestData()[1][0])
    // TODO getting info from server
    return (
      <div className="TaskWindowContent">
        <TaskWindowHeader
          isRequired={isRequired}
          setIsRequired={setIsRequired}
          typeOfWindow= {props.typeOfWindow}
        />
        <TaskForm isRequired={isRequired} />
      </div>
    );
  } else {
    return (
      <div className="TaskWindowContent">
        <TaskWindowHeader
          isRequired={isRequired}
          setIsRequired={setIsRequired}
        />
        <TaskForm isRequired={isRequired} />
      </div>
    );
  }
};

export default TaskWindowContent;
