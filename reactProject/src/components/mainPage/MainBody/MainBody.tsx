import QuestsList from "./QuestsList/QuestsList";
import "./MainBody.css";

const MainBody = (props: any) => {
  return (
    <div className="mainBody">
      {props.questList.created_quests.length === 0 && props.questList.created_quests.length === 0  ? (
        <div>Пустые квесты</div>
      ) : (
        <div>
          <QuestsList
            userid={props.userid}
            questList={props.questList}
            setQuestList={props.setQuestList}
          />
          <img
            onClick={() => {
              props.setAddQuestWindowActive(true);
            }}
            id="addQuestButton"
            src={`${process.env.PUBLIC_URL}/img/addQuestIcon.svg`}
            alt="something"
          />
        </div>
      )}
    </div>
  );
};

export default MainBody;
