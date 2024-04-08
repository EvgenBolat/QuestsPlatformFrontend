import { useParams } from "react-router-dom";
import TasksList from "./TasksList/TasksList";
import { useEffect, useState } from "react";
import "./BlockWindowContent.css";
import BlockNameForm from "./BlockNameForm/BlockNameForm";
import ActionMenu from "../../../genericClasses/ActionMenu/ActionMenu";
import SaveTasksOrderButton from "./SaveTasksOrderButton/SaveTasksOrderButton";

const BlockWindowContent = (props: any) => {
  const [maxTasks, setMaxTasks] = useState(0);
  const [minTasks, setMinTasks] = useState(0);
  useEffect(() => {
    if (props.currentCard.block_type === 1) {
      const fetchTasks = async () => {
        const response = await fetch(
          `https://quests.projectswhynot.site/api/v1/block/${props.currentCard.id}`,
          {
            method: "POST",
            body: JSON.stringify({ auth_token: userid }),
          }
        )
          .then((response) => response.json())
          .catch((error) => console.log(error));
        if (response.status === "OK") {
          setMinTasks(response.message.min_tasks);
        }
      };
      fetchTasks();
    }
  }, []);

  useEffect(() => {
    if (props.currentCard.block_type === 1) {
      let count = 0;
      if (props.tasks.length) {
        for (let i = 0; i < props.tasks.length; i++) {
          if (props.tasks[i].vital == 0) {
            ++count;
          }
        }
      }
      if (maxTasks !== count) {
        setMaxTasks(count);
      }
      if (minTasks > count) {
        setMinTasks(count);
      }
    }
  });
  const [typeofQuest, setTypeOfQuest] = useState(0);
  const { questid } = useParams();
  const userid = localStorage.getItem("id")
  const [countOfTasks, setCountOfTasks] = useState(0);
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
        currentCard={props.currentCard}
        setLeftPosition={setLeftPosition}
        setTopPosition={setTopPosition}
      />
      <div hidden={props.currentCard.block_type !== 1}>
        <div>Напишите количество задач, необходимое для прохождения</div>
        <input
          type="number"
          min={0}
          value={minTasks}
          onChange={(e) => {
            setMinTasks(Number(e.target.value));
          }}
          onBlur={async (e) => {
            const response = await fetch(
              `https://quests.projectswhynot.site/api/v1/block/${props.currentCard.id}`,
              {
                method: "PUT",
                body: JSON.stringify({
                  auth_token: userid,
                  block_name: props.currentCard.block_name,
                  block_num: props.currentCard.block_num,
                  block_type: props.currentCard.block_type,
                  min_tasks: minTasks,
                }),
              }
            )
              .then((response) => response.json())
              .catch((error) => console.log(error));
            if (response.status === "OK") {
              console.log("ok");
            }
          }}
          max={maxTasks}
          id=""
        />
      </div>
      <TasksList
        currentCard={props.currentCard}
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
          tasks={props.tasks}
          blockWindowID={props.blockWindowID}
        />
      ) : (
        <div></div>
      )}
      <img
        draggable={false}
        onClick={handleClick}
        className="CreateTask"
        src={`${process.env.PUBLIC_URL}/img/addQuestIcon.svg`}
        alt=""
      />
    </div>
  );
};

export default BlockWindowContent;
