import "./TaskWindow.css";
import TaskWindowContent from "./TaskWindowContent/TaskWindowContent";

const TaskWindow = (props: any) => {
  console.log(props.deleteId)
  return (
    <div className="TaskWindow">
      <TaskWindowContent
        typeOfWindow={props.typeOfWindow}
        useQuestData={props.useQuestData}
        actionMenuData={props.actionMenuData}
        deleteId={props.deleteId}
        tasks={props.tasks}
        setTaskWindowActive={props.setTaskWindowActive}
        setTasks={props.setTasks}
      />
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
