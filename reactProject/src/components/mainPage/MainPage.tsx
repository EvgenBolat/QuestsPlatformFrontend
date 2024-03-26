import MainBody from "./MainBody/MainBody";
import MainHeader from "./Header/mainHeader";
import { useState } from "react";
import AddQuestWindow from "./AddQuestWindow/AddQuestWindow";
import ProfileWindow from "./Header/ProFileWindow/ProFileWindow";

const MainPage = (props: any) => {
  const [isAddQuestWindowActive, setAddQuestWindowActive] = useState(false);
  const [isProfileWindowActive, setProfileWindowActive] = useState(false);
  const [questList, setQuestList] = useState([
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
  ]);
  return (
    <div>
      {isAddQuestWindowActive ? (
        <AddQuestWindow
          isAddQuestWindowActive={isAddQuestWindowActive}
          setAddQuestWindowActive={setAddQuestWindowActive}
          questList={questList}
          setQuestList={setQuestList}
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
