import { useEffect, useState } from "react";
import QuestHeader from "../QuestPageComponents/QuestHeader/QuestHeader";
import MainHeader from "../mainPage/Header/mainHeader";
import { useNavigate, useParams } from "react-router-dom";
import ActionMenu from "../genericClasses/ActionMenu/ActionMenu";
import ProfileWindow from "../mainPage/Header/ProFileWindow/ProFileWindow";
import ResultTable from "./ResultTable/ResultTable";
import "./TotalPageContent.css"

const TotapPageContent = (props: any) => {
  const [isProfileWindowActive, setProfileWindowActive] = useState(false);
  const [isActionMenuOpen, setActionMenuOpen] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [isClarifyingWindowActive, setIsClarifyingWindowActive] =
    useState(false);
  const [ClarifuyingWindowData, setClarifyingWindowData] = useState(null);
  const navigate = useNavigate();
  const {userid,questid} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://quests.projectswhynot.site/api/v1/quests/${questid}/results`, {
        method: "POST",
        body: JSON.stringify({ auth_token: userid }),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
        if(response.status === "OK"){
          console.log(response.message)
          setResult(response.message)
        }
        console.log(response.message)
    };
    fetchData()
  },[]);
  const [result, setResult] = useState({
    quest_name: "",
    quest_type: 0,
    results: [
      {
        first_name: "",
        last_name: "",
        group_name: "",
        points: 0,
      },
    ],
  });
  return (
    <div>
      <div className="Headers">
        <MainHeader setProfileWindowActive={setProfileWindowActive} />
        <QuestHeader
          setActionMenuOpen={setActionMenuOpen}
          setLeftPosition={setLeftPosition}
          setTopPosition={setTopPosition}
          participating={true}
          questName={result.quest_name}
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
      <div id="resultBody">
        <div id="resultHeader">Итоги квеста</div>
        <ResultTable result={result} />
      </div>
    </div>
  );
};

export default TotapPageContent;
