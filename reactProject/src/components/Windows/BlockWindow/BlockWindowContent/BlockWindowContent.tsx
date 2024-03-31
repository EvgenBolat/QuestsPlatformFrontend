import { useParams } from "react-router-dom";
import TasksList from "./TasksList/TasksList";
import { useState } from "react";
import "./BlockWindowContent.css";
import BlockNameForm from "./BlockNameForm/BlockNameForm";
import ActionMenu from "../../../genericClasses/ActionMenu/ActionMenu";
import SaveTasksOrderButton from "./SaveTasksOrderButton/SaveTasksOrderButton";

const BlockWindowContent = (props: any) => {
  //получаем с сервера данные
  const [typeofQuest, setTypeOfQuest] = useState(0)
  const { userid, questid } = useParams();
  const [countOfTasks, setCountOfTasks] = useState(0)
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [isSaveTasksOrderButtonActive, setSaveTasksOrderButtonActive] =
    useState(false);
  const handleClick = () => {
    props.setCreationTaskWindowActive(true);
  };
  return (
    <div className="BlockWindowContent">
      {props.isActionMenuOpen ? (
        <ActionMenu
          setActionMenuOpen={props.setActionMenuOpen}
          typeOfActionMenu="Block"
          leftPosition={leftPosition}
          topPosition={topPosition}
          useQuestData={props.useQuestData}
          blocks={props.blocks}
          changetasks={props.changetasks}
          blockWindowID={props.blockWindowID}
          actionMenuData={props.actionMenuData}
          setBlocks={props.setBlocks}
          setIsClarifyingWindowActive={props.setIsClarifyingWindowActive}
          setClarifyingWindowData={props.setClarifyingWindowData}
        />
      ) : (
        <div></div>
      )}
      <BlockNameForm
        setActionMenuOpen={props.setActionMenuOpen}
        isActionMenuOpen={props.isActionMenuOpen}
        setLeftPosition={setLeftPosition}
        setTopPosition={setTopPosition}
      />
      <div><div>Напишите количество задач, необходимое для прохождения</div></div>
      <TasksList
        setDeleteID={props.setDeleteID}
        deleteId={props.deleteId}
        className="TasksList"
        setSimpleTaskWindowActive={props.setSimpleTaskWindowActive}
        tasks={props.tasks}
        actionMenuData={props.actionMenuData}
        changetasks={props.changetasks}
        setSaveTasksOrderButtonActive={setSaveTasksOrderButtonActive}
      ></TasksList>
      {isSaveTasksOrderButtonActive ? (
        <SaveTasksOrderButton
          setSaveTasksOrderButtonActive={setSaveTasksOrderButtonActive}
        />
      ) : (
        <div></div>
      )}
      <button className="CreateTask" onClick={handleClick}>
        <img src={`${process.env.PUBLIC_URL}/img/addQuestIcon.svg`} alt="" />
      </button>
    </div>
  );
};

export default BlockWindowContent;
