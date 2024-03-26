import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainHeader from "../mainPage/Header/mainHeader";
import QuestHeader from "./QuestHeader/QuestHeader";
import Blocks from "./Blocks/Blocks";
import QuestFooter from "./QuestFooter/QuestFooter";
import "./QuestPage.css";
import CreationBlocksMenu from "./CreationBlocksMenu/CreationBlocksMenu";
import { useState } from "react";
import BlockWindow from "../Windows/BlockWindow/BlockWindow";
import ProfileWindow from "../mainPage/Header/ProFileWindow/ProFileWindow";
import ActionMenu from "../genericClasses/ActionMenu/ActionMenu";
import TaskWindow from "../Windows/TaskWindow/TaskWindow";
import SaveBlockButton from "./SaveBlocksButton/SaveBlocksButton";
import ClarifyingWindow from "../Windows/ClarifuyingWindow/ClarifyingWindow";

const QuestPage = () => {
  const [isClarifyingWindowActive, setIsClarifyingWindowActive] =
    useState(false);

  const [ClarifuyingWindowData, setClarifyingWindowData] = useState(null);
  const [isBlockWindowActive, setBlockWindowActive] = useState(false);

  const [isCreationTaskWindowActive, setCreationTaskWindowActive] =
    useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);

  const [isSimpleTaskWindowActive, setSimpleTaskWindowActive] = useState(false);

  const [isActionMenuOpen, setActionMenuOpen] = useState(false);

  const [isProfileWindowActive, setProfileWindowActive] = useState(false);

  const [isSaveButtonActive, setSaveButtonActive] = useState(false);

  const [blocks, setBlocks] = useState([
    {
      id: 1,
      order: 0,
      name: "ksfvkjhdfvhjdvh",
      type: "parallel",
    },
    {
      id: 2,
      order: 1,
      name: "иава",
      type: "parallel",
    },
    {
      id: 3,
      order: 2,
      name: "Mike",
      type: "parallel",
    },
    {
      id: 4,
      order: 3,
      name: "Mike2",
      type: "parallel",
    },
    {
      id: 5,
      order: 4,
      name: "Mike3",
      type: "parallel",
    },
  ]);

  let changeBlocks: any = null;

  const [taskId, setTaskId] = useState("");

  const [actionMenuData, setactionMenuData] = useState(null);

  function useQuestData() {
    return [
      [taskId, setTaskId],
      [blockWindowID, setBlockWindowID],
    ];
  }

  const [blockWindowID, setBlockWindowID] = useState(null);

  const { userid } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      {isClarifyingWindowActive ? (
        <ClarifyingWindow
          data={ClarifuyingWindowData}
          setIsClarifyingWindowActive={setIsClarifyingWindowActive}
          setBlockWindowActive={setBlockWindowActive}
        />
      ) : (
        <div></div>
      )}

      {isActionMenuOpen ? (
        <ActionMenu
          setActionMenuOpen={setActionMenuOpen}
          typeOfActionMenu="Quest"
          leftPosition={leftPosition}
          topPosition={topPosition}
          setIsClarifyingWindowActive={setIsClarifyingWindowActive}
          setClarifyingWindowData={setClarifyingWindowData}
        />
      ) : (
        <div></div>
      )}

      {isCreationTaskWindowActive ? (
        <TaskWindow
          typeOfWindow="creation"
          setTaskWindowActive={setCreationTaskWindowActive}
          useQuestData={useQuestData}
        />
      ) : (
        <div></div>
      )}

      {isSimpleTaskWindowActive ? (
        <TaskWindow
          setTaskWindowActive={setSimpleTaskWindowActive}
          typeOfWindow="simple"
          useQuestData={useQuestData}
        />
      ) : (
        <div></div>
      )}

      {isBlockWindowActive ? (
        <BlockWindow
          isBlockWindowActive={isBlockWindowActive}
          setBlockWindowActive={setBlockWindowActive}
          setCreationTaskWindowActive={setCreationTaskWindowActive}
          setSimpleTaskWindowActive={setSimpleTaskWindowActive}
          blockWindowID={blockWindowID}
          useQuestData={useQuestData}
          actionMenuData={actionMenuData}
          blocks={blocks}
          setBlocks={setBlocks}
          setIsClarifyingWindowActive={setIsClarifyingWindowActive}
          setClarifyingWindowData={setClarifyingWindowData}
        />
      ) : (
        <div></div>
      )}
      {isProfileWindowActive ? (
        <ProfileWindow
          isProfileWindowActive={isProfileWindowActive}
          setProfileWindowActive={setProfileWindowActive}
        />
      ) : (
        <div></div>
      )}
      <div className="Headers">
        <MainHeader setProfileWindowActive={setProfileWindowActive} />
        <QuestHeader
          setActionMenuOpen={setActionMenuOpen}
          setLeftPosition={setLeftPosition}
          setTopPosition={setTopPosition}
        />
        <button
          className="exitToQuestButton"
          onClick={(e) => {
            navigate("/user/" + userid);
          }}
        >
          <img
            className="exitToQuestButtonImage"
            src={`${process.env.PUBLIC_URL}/img/exitToMainButton.svg`}
            alt=""
          />
        </button>
      </div>
      <Blocks
        setBlockWindowID={setBlockWindowID}
        setactionMenuData={setactionMenuData}
        isBlockWindowActive={isBlockWindowActive}
        setBlockWindowActive={setBlockWindowActive}
        setSaveButtonActive={setSaveButtonActive}
        setBlocks={setBlocks}
        changeBlocks={changeBlocks}
        blocks={blocks}
      />
      <CreationBlocksMenu />
      <SaveBlockButton
        isSaveButtonActive={isSaveButtonActive}
        setSaveButtonActive={setSaveButtonActive}
      />
      <QuestFooter />
    </div>
  );
};

export default QuestPage;
