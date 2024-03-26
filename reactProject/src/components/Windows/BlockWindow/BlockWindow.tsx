import BlockWindowContent from "./BlockWindowContent/BlockWindowContent";
import "./BlockWindow.css";
import { useState } from "react";

const BlockWindow = (props: any) => {
  const [isActionMenuOpen, setActionMenuOpen] = useState(false);
  return (
    <div className="BlockWindow">
      <BlockWindowContent
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

export default BlockWindow;
