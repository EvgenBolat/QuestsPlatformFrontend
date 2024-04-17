import { useParams } from "react-router-dom";
import TaskBlock from "../../../Windows/BlockWindow/BlockWindowContent/TasksList/TaskBlock/TaskBlock";
import "./ActionMenuContent.css";
const ActionMenuContent = (props: any) => {
  const userid = localStorage.getItem("id");
  const className =
    "ActionMenuContent ActionMenuContent" + props.typeOfActionMenu;
  const style =
    props.typeOfActionMenu === "Task"
      ? {
          left: `${props.leftPosition - 15}px`,
          top: `${props.topPosition + 5}px`,
        }
      : props.typeOfActionMenu === "Quest"
      ? {
          left: `${props.leftPosition}px`,
          top: `${props.topPosition}px`,
        }
      : {
          left: `${props.leftPosition}px`,
          top: `${props.topPosition + 5}px`,
        };

  return (
    <div style={style} className={className}>
      <button
        hidden={props.typeOfActionMenu !== "Quest"}
        disabled={props.typeOfActionMenu !== "Quest"}
        onClick={() => {
          if (props.isSaved === false || props.isShaffled === true) {
            alert("Вы не сохранили изменения в списке блоков!");
            return;
          }
          if (props.isShaffledTasks && props.isShaffledTasks === true) {
            alert("Вы не сохранили изменения в списке задач!");
            return;
          }
          props.setAddQuestWindowActive(true);
        }}
      >
        Изменить
      </button>
      <button
        hidden={props.typeOfActionMenu === "Task"}
        disabled={props.typeOfActionMenu === "Task"}
        onClick={() => {
          if (props.isSaved === false || props.isShaffled === true) {
            alert("Вы не сохранили изменения в списке блоков!");
            return;
          }
          if (props.isShaffledTasks && props.isShaffledTasks === true) {
            alert("Вы не сохранили изменения в списке задач!");
            return;
          }
          props.setClarifyingWindowData({
            typeOfWindow:
              props.typeOfActionMenu === "Block"
                ? "dublicateBlock"
                : "dublicateQuest",
            typeOfAction: "dublicate",
            blocks: props.blocks,
            current: props.actionMenuData,
            setBlocks: props.setBlocks,
          });
          props.setIsClarifyingWindowActive(true);
          props.setActionMenuOpen(false);
        }}
      >
        Дублировать
      </button>
      <button
        onClick={async (e) => {
          if (props.isSaved === false || props.isShaffled === true) {
            alert("Вы не сохранили изменения в списке блоков!");
            return;
          }
          if (props.isShaffledTasks && props.isShaffledTasks === true) {
            alert("Вы не сохранили изменения в списке задач!");
            return;
          }
          if (props.typeOfActionMenu !== "Task") {
            props.setClarifyingWindowData({
              typeOfWindow:
                props.typeOfActionMenu === "Block"
                  ? "deleteBlock"
                  : "deleteQuest",
              typeOfAction: "delete",
              blocks: props.blocks,
              current: props.actionMenuData,
              setBlocks: props.setBlocks,
            });
            props.setIsClarifyingWindowActive(true);
          } else {
            const response = await fetch(
              `https://quests.projectswhynot.site/api/v1/task/${props.deleteId}/delete`,
              {
                method: "DELETE",
                body: JSON.stringify({ auth_token: userid }),
              }
            )
              .then((response) => response.json())
              .catch((error) => console.log(error));
            if (response.status === "OK") {
              let newTasks: any = [];
              props.tasks.forEach((el: any) => {
                if (el.id !== props.deleteId) {
                  newTasks.push(el);
                }
              });
              for (let i = 0; i < newTasks.length; i++) {
                newTasks[i].order = i;
              }
              props.setTasks([...newTasks]);
              return;
            } else if (response.message === "Registrate first") {
              localStorage.clear();
              localStorage.setItem("auth", JSON.stringify(false));
              window.location.reload();
              return;
            }
          }
          props.setActionMenuOpen(false);
        }}
      >
        Удалить
      </button>
    </div>
  );
};

export default ActionMenuContent;
