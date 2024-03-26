import "./TaskWindow.css";
import TaskWindowContent from "./TaskWindowContent/TaskWindowContent";

const TaskWindow = (props: any) => {
  return (
    <div className="TaskWindow">
      <TaskWindowContent typeOfWindow={props.typeOfWindow}
      useQuestData={props.useQuestData} />
      <button
        onClick={(e) => {
          props.setTaskWindowActive(false);
        }}
        className="TaskExitButton"
      >
        <img
          className="TaskExitButtonImage"
          src={`${process.env.PUBLIC_URL}/img/ExitButton.svg`}
          alt=""
        />
      </button>
    </div>
  );
};

export default TaskWindow;
