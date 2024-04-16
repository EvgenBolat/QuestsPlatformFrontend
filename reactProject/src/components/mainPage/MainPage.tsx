import MainBody from "./MainBody/MainBody";
import MainHeader from "./Header/mainHeader";
import { useEffect, useState } from "react";
import AddQuestWindow from "./AddQuestWindow/AddQuestWindow";
import ProfileWindow from "./Header/ProFileWindow/ProFileWindow";

const MainPage = (props: any) => {
  const userid = localStorage.getItem("id");
  const [isUpdated, setUpdated] = useState(false);
  const [isAddQuestWindowActive, setAddQuestWindowActive] = useState(false);
  const [isProfileWindowActive, setProfileWindowActive] = useState(false);
  const [questList, setQuestList] = useState({
    created_quests: [],
    participated_quest: [],
  });
  useEffect(() => {
    if (!isUpdated) {
      const fetchData = async () => {
        const response = await fetch(
          "https://quests.projectswhynot.site/api/v1/quests",
          {
            method: "POST",
            body: JSON.stringify({ auth_token: userid }),
          }
        )
          .then((response) => response.json())
          .catch((error) => console.log(error));
        if (response.status === "OK") {
          setQuestList(response.message);
        }
        else if (response.message === "Registrate first") {
          localStorage.clear();
          localStorage.setItem("auth", JSON.stringify(false));
          window.location.reload();
        }
      };
      fetchData();
      setUpdated(true)
    }
  }, []);
  return (
    <div>
      {isAddQuestWindowActive ? (
        <AddQuestWindow
          isAddQuestWindowActive={isAddQuestWindowActive}
          setAddQuestWindowActive={setAddQuestWindowActive}
          questList={questList}
          setQuestList={setQuestList}
          typeOfWindow={0}
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
      <MainHeader setProfileWindowActive={setProfileWindowActive} />
      <MainBody
        userid={props.userid}
        setAddQuestWindowActive={setAddQuestWindowActive}
        questList={questList}
        setQuestList={setQuestList}
      />
    </div>
  );
};

export default MainPage;
