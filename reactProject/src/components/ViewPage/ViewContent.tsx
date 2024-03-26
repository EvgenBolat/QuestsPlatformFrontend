import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../mainPage/Header/mainHeader";
import QuestHeader from "../QuestPageComponents/QuestHeader/QuestHeader";
import ActionMenu from "../genericClasses/ActionMenu/ActionMenu";
import { useState } from "react";
import ClarifyingWindow from "../Windows/ClarifuyingWindow/ClarifyingWindow";
import ProfileWindow from "../mainPage/Header/ProFileWindow/ProFileWindow";
import "./ViewContent.css"
import ViewList from "./ViewList/ViewList";

const ViewContent = (props: any) => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [isActionMenuOpen, setActionMenuOpen] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [isClarifyingWindowActive, setIsClarifyingWindowActive] =
    useState(false);
  const [isProfileWindowActive, setProfileWindowActive] = useState(false);
  const [ClarifuyingWindowData, setClarifyingWindowData] = useState(null);
  const setBlockWindowActive = null;
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
      </div>
      <ViewList />
      <button
          className="exitToQuestButtonFromView"
          onClick={(e) => {
            navigate(-1);
          }}
        >
          <img
            className="exitToQuestButtonImage"
            src={`${process.env.PUBLIC_URL}/img/openedEye.svg`}
            alt=""
          />
        </button>
    </div>
  );
};

export default ViewContent;
