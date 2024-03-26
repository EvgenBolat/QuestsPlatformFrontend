import { useLocation } from "react-router-dom";
import BlockView from "../../genericClasses/BlockView/BlockView";
import "./ViewList.css"

const ViewList = (props: any) => {
  const data = {
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
              vital: true,
              description: "Найдите эльфа, и получите у него горшочек с золото",
              question: "",
              answer: "",
              correct_answer: "jfdfvkkhbsfhv",
              npc_email: "Vika@hse.edu.ru",
              min_points: 2,
              max_points: 4,
              second: 160,
            },
            {
              id: 1,
              task_type: 0,
              task_num: 1,
              vital: false,
              description: "Ну вы придурки, если ответите неправильно",
              question: "how old are you?",
              answer: "14",
              correct_answer: "",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              second: 180,
            },
            {
              id: 2,
              task_type: 1,
              task_num: 2,
              vital: true,
              description: "Ура, картинОчка",
              question: "",
              answer: "",
              correct_answer: "3i4ujfhbbshdbfvcf",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              second: 160,
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
              vital: true,
              description: "Найдите эльфа, и получите у него горшочек с золото",
              question: "",
              answer: "",
              correct_answer: "jfdfvkkhbsfhv",
              npc_email: "Vika@hse.edu.ru",
              min_points: 2,
              max_points: 4,
              second: 160,
            },
            {
              id: 1,
              task_type: 0,
              task_num: 1,
              vital: false,
              description: "Ну вы придурки, если ответите неправильно",
              question: "how old are you?",
              answer: "14",
              correct_answer: "",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              second: 180,
            },
            {
              id: 2,
              task_type: 1,
              task_num: 2,
              vital: true,
              description: "Ура, картинОчка",
              question: "",
              answer: "",
              correct_answer: "3i4ujfhbbshdbfvcf",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              second: 160,
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
              vital: true,
              description: "Найдите эльфа, и получите у него горшочек с золото",
              question: "",
              answer: "",
              correct_answer: "jfdfvkkhbsfhv",
              npc_email: "Vika@hse.edu.ru",
              min_points: 2,
              max_points: 4,
              second: 160,
            },
            {
              id: 1,
              task_type: 0,
              task_num: 1,
              vital: false,
              description: "Ну вы придурки, если ответите неправильно",
              question: "how old are you?",
              answer: "14",
              correct_answer: "",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              second: 180,
            },
            {
              id: 2,
              task_type: 1,
              task_num: 2,
              vital: true,
              description: "Ура, картинОчка",
              question: "",
              answer: "",
              correct_answer: "3i4ujfhbbshdbfvcf",
              npc_email: "",
              min_points: 2,
              max_points: 4,
              second: 160,
            },
          ],
        },
      ],
    },
  };
  return (
    <div className="viewList">
      {data.message.blocks.map((el: any) => {
        return (
          <BlockView
            viewMode={true}
            length={data.message.blocks.length}
            data={el}
            key={el.id}
          />
        );
      })}
    </div>
  );
};

export default ViewList;
