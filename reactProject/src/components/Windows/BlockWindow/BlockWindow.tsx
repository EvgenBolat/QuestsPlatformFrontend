import BlockWindowContent from "./BlockWindowContent/BlockWindowContent";
import "./BlockWindow.css";
import { useState } from "react";

const BlockWindow = (props: any) => {
  const [isActionMenuOpen, setActionMenuOpen] = useState(false);
  return (
    <div className="BlockWindow">
      <div id="BlockWindowContainer">
        <BlockWindowContent
          currentCard={props.currentCard}
          tasks={props.tasks}
          changetasks={props.changetasks}
          deleteId={props.deleteId}
          setDeleteID={props.setDeleteID}
          className="BlockWindowContent"
          blockWindowID={props.blockWindowID}
          setActionMenuOpen={setActionMenuOpen}
          isActionMenuOpen={isActionMenuOpen}
          setCreationTaskWindowActive={props.setCreationTaskWindowActive}
          setSimpleTaskWindowActive={props.setSimpleTaskWindowActive}
          useQuestData={props.useQuestData}
          actionMenuData={props.actionMenuData}
          blocks={props.blocks}
          setBlocks={props.setBlocks}
          setIsClarifyingWindowActive={props.setIsClarifyingWindowActive}
          setClarifyingWindowData={props.setClarifyingWindowData}
        />
        <button
          onClick={(e) => {
            props.setBlockWindowActive(!props.isBlockWindowActive);
          }}
          className="BlockExitButton"
        >
          <img
            className="BlockExitButtonImage"
            src={`${process.env.PUBLIC_URL}/img/ExitButton.svg`}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default BlockWindow;
