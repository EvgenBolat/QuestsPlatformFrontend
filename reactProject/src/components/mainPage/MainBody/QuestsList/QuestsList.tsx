import QuestCard from "../QuestCard/QuestCard";
import "./QuestsList.css";

const QuestsList = (props: any) => {
  console.log(props.questList.created_quests.length)
  return (
    <div>
      {props.questList.created_quests && props.questList.created_quests.length > 0 ? (
        <div>
          {" "}
          <h1 id="firstType">Созданные вами квесты</h1>
          <div id="createdQuests">
            {props.questList.created_quests.map((el: any) => {
              return (
                <QuestCard
                  participating={false}
                  data={el}
                  userid={props.userid}
                  key={el.id}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {props.questList.participated_quests && props.questList.participated_quests.length > 0 ? <div><h1 id="secondType">Квесты, в которых вы участвуете</h1>
      <div id="participantQuests">
        {props.questList.participated_quests.map((el: any) => {
          return (
            <QuestCard
              participating={true}
              data={el}
              userid={props.userid}
              key={el.id}
            />
          );
        })}
      </div></div> : <div></div>}
      
    </div>
  );
};

//	RGB (169,218,64) - зелёный
// RGB (95,64,219) – фиолетовый
// RGB (218,88,64) – красный

export default QuestsList;
