import { useEffect, useState } from "react";
import "./ParticipantsListWindowContent.css";

const ParticipantsListWindowContent = (props: any) => {
  const [data, setData] = useState({
    participants: [
      { surName_name: "Evgen Bolat", is_creator: true },
      { surName_name: "Victoria Khan", is_creator: false },
      { surName_name: "Evgen Bolat34", is_creator: false },
    ],
  });

  const [clicked, setClicked] = useState(false);

  const [blockData, setBlockData] = useState(buildParticipants());

  function buildParticipants() {
    let counter = 0;
    let newData = data.participants.map((elem: any) => {
      return (
        <div id="participantsElement" key={++counter}>
          <div id="ParticipantsInfo">{elem.surName_name}</div>
          {!props.AsParticipants ||
          (props.AsParticipants && props.isTeamCreator) ? (
            !props.AsParticipants ||
            (props.AsParticipants &&
              props.isTeamCreator &&
              !elem.is_creator) ? (
              <img
                id="deleteParticipantButton"
                onClick={() => {
                  let index = data.participants.findIndex(
                    (el: any) => el.surName_name === elem.surName_name
                  );
                  data.participants.splice(index, 1);
                  let newData = data;
                  setData(newData);
                  setClicked(true);
                }}
                src={`${process.env.PUBLIC_URL}/img/ExitButton.svg`}
                alt=""
              />
            ) : (
              <div id="deleteParticipantButton"></div>
            )
          ) : (
            <div id="deleteParticipantButton"></div>
          )}
        </div>
      );
    });
    return newData;
  }

  useEffect(() => {
    setBlockData(buildParticipants());
    setClicked(false);
  }, [clicked]);
  return (
    <div id="ParticipantsListWindowContent">
      <div id="ParticipantsListHeader">Список участников</div>
      <div>{blockData}</div>
    </div>
  );
};

export default ParticipantsListWindowContent;
