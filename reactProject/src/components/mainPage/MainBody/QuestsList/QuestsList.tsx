import QuestCard from "../QuestCard/QuestCard";
import "./QuestsList.css";

const QuestsList = (props: any) => {
  return (
    <div>
      {props.questList.created_quests &&
      props.questList.created_quests.length > 0 ? (
        <div>
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
      {props.questList.participated_quests &&
      props.questList.participated_quests.length > 0 ? (
        <div>
          <h1 id="secondType">Квесты, в которых вы участвуете</h1>
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
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {(!props.questList.created_quests ||
      props.questList.created_quests.length === 0) &&
      (!props.questList.participated_quests ||
      props.questList.participated_quests.length === 0)? (
        <div id="emptyLists">
          <img id="EmptyWeb" src={`${process.env.PUBLIC_URL}/img/EmptyWeb.svg`} alt="" />
          <div id="emptyListsHeader">Пока здесь ничего нет.</div>
          <div id="emptyListsBody">
            Создайте свой собственный или примите участие в квестах других
            пользователей
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

//	RGB (169,218,64) - зелёный
// RGB (95,64,219) – фиолетовый
// RGB (218,88,64) – красный

export default QuestsList;
