import QuestCard from "../QuestCard/QuestCard";
import "./QuestsList.css";

const QuestsList = (props: any) => {
  const quest = [
    {
      id: 1,
      isCreated: true,
      name: "jesus",
      image:
        "https://i.pinimg.com/564x/4e/9c/5d/4e9c5dd27f34dd02b0f16e8bd7108dc7.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nihil, temporibus magni pariatur atque fugiat quis facilis laborum vel, a dolor ullam asperiores id impedit nam deserunt quae esse tenetur culpa! Provident perspiciatis quia quidem suscipit, magni incidunt enim excepturi eveniet! Deleniti quos sed consectetur fugit magnam dicta explicabo facilis?",
      data_of_start: "23.12.2024 в 12:00",
      data_of_end: "5.01.2025 в 15:00",
    },
    {
      id: 2,
      isCreated: false,
      name: "jesus",
      image:
        "https://i.pinimg.com/564x/e7/a5/18/e7a5187f47c50a611038ec8db289dc2d.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nihil, temporibus magni pariatur atque fugiat quis facilis laborum vel, a dolor ullam asperiores id impedit nam deserunt quae esse tenetur culpa! Provident perspiciatis quia quidem suscipit, magni incidunt enim excepturi eveniet! Deleniti quos sed consectetur fugit magnam dicta explicabo facilis?",
      data_of_start: "23.12.2024 в 12:00",
      data_of_end: "5.01.2025 в 15:00",
    },
  ];
  const createdQuest = props.questList.filter((el: any) => {
    if (el.isCreated) {
      return el;
    }
  });

  const participantQuest = props.questList.filter((el: any) => {
    if (!el.isCreated) {
      return el;
    }
  });

  return (
    <div>
      <h1 id="firstType">Созданные вами квесты</h1>
      <div id="createdQuests">
        {createdQuest.map((el: any) => {
          return <QuestCard data={el} userid={props.userid} key={el.id} />;
        })}
      </div>
      <h1 id="secondType">Квесты, в которых вы участвуете</h1>
      <div id="participantQuests">
        {participantQuest.map((el: any) => {
          return <QuestCard data={el} userid={props.userid} key={el.id} />;
        })}
      </div>
    </div>
  );
};

//	RGB (169,218,64) - зелёный
// RGB (95,64,219) – фиолетовый
// RGB (218,88,64) – красный

export default QuestsList;
