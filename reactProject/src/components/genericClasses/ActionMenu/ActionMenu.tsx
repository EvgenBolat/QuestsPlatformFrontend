import ActionMenuContent from "./ActionMenuContent/ActionMenuContent";
import "./ActionMenu.css";
const ActionMenu = (props: any) => {
  return (
    <div>
      <div
        className="BackgroungActionMenu"
        onClick={(e) => {
          props.setActionMenuOpen(false);
        }}
      >
        <ActionMenuContent
          leftPosition={props.leftPosition}
          topPosition={props.topPosition}
          typeOfActionMenu={props.typeOfActionMenu}
          useQuestData={props.useQuestData}
          blocks={props.blocks}
          changetasks={props.changetasks}
          actionMenuData={props.actionMenuData}
          data={props.data}
          setBlocks={props.setBlocks}
          setActionMenuOpen={props.setActionMenuOpen}
          setIsClarifyingWindowActive={props.setIsClarifyingWindowActive}
          setClarifyingWindowData={props.setClarifyingWindowData}
          tasks={props.tasks}
          deleteId={props.deleteId}
          setTasks={props.setTasks}
          setAddQuestWindowActive={props.setAddQuestWindowActive}
        />
      </div>
    </div>
  );
};

export default ActionMenu;
