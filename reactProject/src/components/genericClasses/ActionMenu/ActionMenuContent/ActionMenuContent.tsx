import TaskBlock from "../../../Windows/BlockWindow/BlockWindowContent/TasksList/TaskBlock/TaskBlock";
import "./ActionMenuContent.css";
const ActionMenuContent = (props: any) => {
  const className =
    "ActionMenuContent ActionMenuContent" + props.typeOfActionMenu;
  const style =
    props.typeOfActionMenu === "Task"
      ? { left: `${props.leftPosition - 38}px`, top: `${props.topPosition}px` }
      : {
          left: `${props.leftPosition - 200}px`,
          top: `${props.topPosition}px`,
        };
  
  
  return (
    <div style={style} className={className}>
      <button
        onClick={() => {
          props.setClarifyingWindowData({
            typeOfWindow: (props.typeOfActionMenu === "Block") ? "dublicateBlock": "dublicateQuest",
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
        onClick={(e) => {
          props.setClarifyingWindowData({
            typeOfWindow: (props.typeOfActionMenu === "Block") ? "deleteBlock": "deleteQuest",
            typeOfAction: "delete",
            blocks: props.blocks,
            current: props.actionMenuData,
            setBlocks: props.setBlocks,
          });
          props.setIsClarifyingWindowActive(true);
          props.setActionMenuOpen(false);
        }}
      >
        Удалить
      </button>
    </div>
  );
};

export default ActionMenuContent;
