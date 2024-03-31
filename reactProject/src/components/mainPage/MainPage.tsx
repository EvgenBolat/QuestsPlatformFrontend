import MainBody from "./MainBody/MainBody";
import MainHeader from "./Header/mainHeader";
import { useState } from "react";
import AddQuestWindow from "./AddQuestWindow/AddQuestWindow";
import ProfileWindow from "./Header/ProFileWindow/ProFileWindow";

const MainPage = (props: any) => {
  const [isAddQuestWindowActive, setAddQuestWindowActive] = useState(false);
  const [isProfileWindowActive, setProfileWindowActive] = useState(false);
  const [questList, setQuestList] = useState({
    created_quests: [
      {
        id: 1,
        quest_name: "jesus",
        quest_type: 0,
        short:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nihil, temporibus magni pariatur atque fugiat quis facilis laborum vel, a dolor ullam asperiores id impedit nam deserunt quae esse tenetur culpa! Provident perspiciatis quia quidem suscipit, magni incidunt enim excepturi eveniet! Deleniti quos sed consectetur fugit magnam dicta explicabo facilis?",
        start_time: "23.12.2024 12:00",
        end_time: "23.12.2024 20:00",
        quest_image:
          "https://i.pinimg.com/736x/04/77/ff/0477ffa63236b4e21e22923fde0b5aa6.jpg",
      },
      {
        id: 2,
        quest_name: "jesus",
        quest_type: 1,
        short:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nihil, temporibus magni pariatur atque fugiat quis facilis laborum vel, a dolor ullam asperiores id impedit nam deserunt quae esse tenetur culpa! Provident perspiciatis quia quidem suscipit, magni incidunt enim excepturi eveniet! Deleniti quos sed consectetur fugit magnam dicta explicabo facilis?",
        start_time: "23.12.2024 12:00",
        end_time: "23.12.2024 20:00",
        quest_image:
          "https://i.pinimg.com/564x/e7/a5/18/e7a5187f47c50a611038ec8db289dc2d.jpg",
      },
    ],
    participated_quests: [
      {
        id: 1,
        quest_name: "jesus",
        quest_type: 0,
        short:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nihil, temporibus magni pariatur atque fugiat quis facilis laborum vel, a dolor ullam asperiores id impedit nam deserunt quae esse tenetur culpa! Provident perspiciatis quia quidem suscipit, magni incidunt enim excepturi eveniet! Deleniti quos sed consectetur fugit magnam dicta explicabo facilis?",
        start_time: "23.12.2024 12:00",
        end_time: "23.12.2024 20:00",
        quest_image:
          "https://i.pinimg.com/564x/4e/9c/5d/4e9c5dd27f34dd02b0f16e8bd7108dc7.jpg",
      },
      {
        id: 2,
        quest_name: "jesus",
        quest_type: 1,
        short:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nihil, temporibus magni pariatur atque fugiat quis facilis laborum vel, a dolor ullam asperiores id impedit nam deserunt quae esse tenetur culpa! Provident perspiciatis quia quidem suscipit, magni incidunt enim excepturi eveniet! Deleniti quos sed consectetur fugit magnam dicta explicabo facilis?",
        start_time: "23.12.2024 12:00",
        end_time: "23.12.2024 20:00",
        quest_image:
          "https://i.pinimg.com/564x/e7/a5/18/e7a5187f47c50a611038ec8db289dc2d.jpg",
      },
    ]
  });
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
