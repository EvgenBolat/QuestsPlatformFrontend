import "./TaskWindow.css";
import TaskWindowContent from "./TaskWindowContent/TaskWindowContent";

const TaskWindow = (props: any) => {
  return (
    <div className="TaskWindow">
      <div id="TaskWindowContainer">
        <TaskWindowContent
          currentCard={props.currentCard}
          typeOfWindow={props.typeOfWindow}
          useQuestData={props.useQuestData}
          setCurrentCard={props.setCurrentCard}
          actionMenuData={props.actionMenuData}
          deleteId={props.deleteId}
          tasks={props.tasks}
          setDeleteID={props.setDeleteID}
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
    </div>
  );
};

export default TaskWindow;
