import { useEffect, useState } from "react";
import TotapPageContent from "../components/TotalPageContent/TotalPageContent";

const Total = () => {
  // useEffect(() => {
  //   setResult({ quest_name: "sdfds", data: [{user_info : "Хавронич Евгениий"}] });
  // });
  const [result, setResult] = useState({
    quest_name: "sdfds",
    quest_type: 0,
    data: [
      {
        user_info: "Джонни Кейдж",
        points: 230,
      },
      {
        user_info: "Кэсси Кейдж",
        points: 220,
      },
    ],
  });
  const result2 = {
    quest_name: "sdfds",
    quest_type: 1,
    data: [
      {
        team_name: "Аристократочки",
        participants: [
          {
            user_info: "ТМЛОтлотам ",
            points: 230,
          },
          {
            name: "ЛОТМВЛОТМот ава",
            points: 230,
          },
        ],
      },
      {
        team_name: "Bad boys",
        participants: [
          {
            user_info: "Хавронич Евгений",
            points: 220,
          },
          {
            name: "Хан Виктория",
            points: 220,
          },
        ],
      },
      {
        team_name: "Pretty boys",
        participants: [
          {
            user_info: "Хавронич Евгений",
            points: 230,
          },
          {
            name: "Хан Виктория",
            points: 230,
          },
        ],
      },
    ],
  };
  return <TotapPageContent result={result} />;
};

export default Total;
