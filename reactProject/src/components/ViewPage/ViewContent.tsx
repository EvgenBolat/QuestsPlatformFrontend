import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainHeader from "../mainPage/Header/mainHeader";
import QuestHeader from "../QuestPageComponents/QuestHeader/QuestHeader";
import ActionMenu from "../genericClasses/ActionMenu/ActionMenu";
import { useEffect, useState } from "react";
import ClarifyingWindow from "../Windows/ClarifuyingWindow/ClarifyingWindow";
import ProfileWindow from "../mainPage/Header/ProFileWindow/ProFileWindow";
import "./ViewContent.css";
import ViewList from "./ViewList/ViewList";
import AddQuestWindow from "../mainPage/AddQuestWindow/AddQuestWindow";

const ViewContent = (props: any) => {
  const { questid } = useParams();
  const userid = localStorage.getItem("id")
  const navigate = useNavigate();
  const location = useLocation();
  const [isActionMenuOpen, setActionMenuOpen] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [quest_name, set_quest_name] = useState("")
  const [isClarifyingWindowActive, setIsClarifyingWindowActive] =
    useState(false);
  const [isProfileWindowActive, setProfileWindowActive] = useState(false);
  const [ClarifuyingWindowData, setClarifyingWindowData] = useState(null);
  const [isAddQuestWindowActive, setAddQuestWindowActive] = useState(false);
  const setBlockWindowActive = null;
  const [datafromServer, setDataFromServer] = useState([
    {
      id: "-1",
      block_name: "",
      block_type: 0,
      block_num: 0,
      min_tasks: 0,
      tasks_list: [
      ],
    },
  ]
);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://quests.projectswhynot.site/api/v1/quests/${questid}`,
        {
          method: "POST",
          body: JSON.stringify({ auth_token: userid }),
        }
      )
        .then((responce) => responce.json())
        .catch((error) => console.log(error));
      if (data.status === "OK") {
        setDataFromServer(data.message.blocks_list);
        set_quest_name(data.message.quest_name)
      }
    };
    fetchData();
  },[]);
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
      {isAddQuestWindowActive ? (
          <AddQuestWindow
            isAddQuestWindowActive={isAddQuestWindowActive}
            setAddQuestWindowActive={setAddQuestWindowActive}
            typeOfWindow={1}
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
          setAddQuestWindowActive={setAddQuestWindowActive}
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
          questName={quest_name}
        />
      </div>
      <ViewList datafromServer={datafromServer} setDataFromServer={setDataFromServer} />
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
