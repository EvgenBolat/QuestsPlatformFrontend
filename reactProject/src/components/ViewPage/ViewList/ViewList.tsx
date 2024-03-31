import { useLocation } from "react-router-dom";
import BlockView from "../../genericClasses/BlockView/BlockView";
import "./ViewList.css";
import { useState } from "react";

const ViewList = (props: any) => {
  const datafromServer = {
    status: "ok",
    message: {
      blocks: [
        {
          id: 1,
          block_type: 0,
          block_name: "fdfdf",
          block_num: 0,
          vits: 0,
          tasks: [
            {
              id: 0,
              task_type: 2,
              task_num: 0,
              state: 0,
              vital: true,
              description: "Найдите эльфа, и получите у него горшочек с золото",
              question: "",
              answer: "jfdfvkkhbsfhv",
              files: [
                `${process.env.PUBLIC_URL}/img/document.svg`,
                `${process.env.PUBLIC_URL}/img/camera.svg`,
                `${process.env.PUBLIC_URL}/img/openedEye.svg`,
              ],
              npc_email: "Vika@hse.edu.ru",
              min_points: 2,
              max_points: 4,
              task_time: 160,
            },
            {
              id: 1,
              task_type: 0,
              task_num: 1,
              state: 0,
              vital: false,
              description: "Ну вы придурки, если ответите неправильно",
              question: "how old are you?",
              answer: "14",
              files: [],
              npc_email: "",
              min_points: 2,
              max_points: 4,
              task_time: 180,
            },
            {
              id: 2,
              task_type: 1,
              task_num: 2,
              state: 0,
              files: [],
              vital: true,
              description: "Ура, картинОчка",
              question: "",
              answer: "3i4ujfhbbshdbfvcf",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              task_time: 160,
            },
          ],
        },
        {
          id: 2,
          block_name: "Gold",
          block_type: 1,
          block_num: 1,
          vits: 0,
          tasks: [
            {
              id: 0,
              task_type: 2,
              task_num: 0,
              state: 0,
              vital: true,
              files: [],
              description: "Найдите эльфа, и получите у него горшочек с золото",
              question: "",
              answer: "",
              npc_email: "Vika@hse.edu.ru",
              min_points: 2,
              max_points: 4,
              task_time: 160,
            },
            {
              id: 1,
              task_type: 0,
              task_num: 1,
              state: 0,
              vital: false,
              files: [],
              description: "Ну вы придурки, если ответите неправильно",
              question: "how old are you?",
              answer: "14",
              correct_answer: "",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              task_time: 180,
            },
            {
              id: 2,
              task_type: 1,
              task_num: 2,
              vital: true,
              state: 0,
              description: "Ура, картинОчка",
              question: "",
              answer: "",
              correct_answer: "3i4ujfhbbshdbfvcf",
              npc_email: "",
              files: [],
              min_points: 2,
              max_points: 4,
              task_time: 160,
            },
          ],
        },
        {
          id: 3,
          block_name: "JFDkds",
          block_type: 0,
          block_num: 2,
          vits: 0,
          tasks: [
            {
              id: 0,
              task_type: 2,
              task_num: 0,
              state: 0,
              vital: true,
              files: [],
              description: "Найдите эльфа, и получите у него горшочек с золото",
              question: "",
              answer: "",
              correct_answer: "jfdfvkkhbsfhv",
              npc_email: "Vika@hse.edu.ru",
              min_points: 2,
              max_points: 4,
              task_time: 160,
            },
            {
              id: 1,
              task_type: 0,
              task_num: 1,
              state: 0,
              files: [],
              vital: false,
              description: "Ну вы придурки, если ответите неправильно",
              question: "how old are you?",
              answer: "14",
              correct_answer: "",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              task_time: 180,
            },
            {
              id: 2,
              task_type: 1,
              task_num: 2,
              state: 0,
              vital: true,
              files: [],
              description: "Ура, картинОчка",
              question: "",
              answer: "",
              correct_answer: "3i4ujfhbbshdbfvcf",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              task_time: 160,
            },
          ],
        },
      ],
    },
  };
  const [data, setData] = useState(datafromServer.message.blocks);
  return (
    <div className="viewList">
      {data.map((el: any) => {
        return (
          <BlockView
            setData={setData}
            questData={data}
            viewMode={true}
            length={data.length}
            data={el}
            key={el.id}
            blockId={el.id}
          />
        );
      })}
    </div>
  );
};

export default ViewList;
