import { useState } from "react";
import "./ParticipantWindowContent.css";
import { useParams } from "react-router-dom";

const ParticipantWindowContent = (props: any) => {
  const [oldname, setOldName] = useState(props.teamName);
  const [name, setName] = useState(props.teamName);
  const [incorrectTeamNameError, setIncorrectTeamNameError] = useState(false);
  const { questid } = useParams();
  const userid = localStorage.getItem("id")

  const [alreadyExistTeamNameError, setalreadyExistTeamNameError] =
    useState(false);
  let className = "participateButtonsContainer";

  const [clicked, setClicked] = useState(false);
  if (props.typeOfParticipantWindow === 0) {
    className += " CreateTeamButton";
  }
  return (
    <div id="ParticipantWindowContent">
      <div id="actionWithTeam">
        {props.typeOfParticipantWindow === 0 ||
        props.typeOfParticipantWindow === 1
          ? "Название команды:"
          : "Введите название команды"}
      </div>
      <input
        type="text"
        name=""
        id="questNameInput"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setalreadyExistTeamNameError(false);
          setClicked(false);
          setIncorrectTeamNameError(false);
        }}
      />
      <div
        className="errorTeamText"
        hidden={
          props.typeOfParticipantWindow === 2 ||
          !clicked ||
          !alreadyExistTeamNameError
        }
      >
        Команда с таким названием уже существует!
      </div>
      <div
        className="errorTeamText"
        hidden={
          props.typeOfParticipantWindow !== 2 ||
          (!incorrectTeamNameError && !clicked)
        }
      >
        Несуществующая команда
      </div>
      <div className={className}>
        <button
          hidden={props.typeOfParticipantWindow !== 1}
          id="DeleteTeamButton"
          onClick={(e) => {
            const fetchData = async () => {
              const response = await fetch(
                `https://quests.projectswhynot.site/api/v1/quests/${questid}/removegroup`,
                {
                  method: "DELETE",
                  body: JSON.stringify({
                    auth_token: userid,
                  }),
                }
              )
                .then((response) => response.json())
                .catch((error) => console.log(error));
              if (response.status === "OK") {
                props.setTeamCreator(false);
                props.setInCommand(false);
                props.setParticipantWindowActive(false);
                props.setTeamName("");
              }
            };
            fetchData();
          }}
        >
          Удалить
        </button>
        <button
          hidden={props.typeOfParticipantWindow !== 1}
          disabled={oldname === name}
          id="ChangedNameButton"
          onClick={(e) => {
            const fetchData = async () => {
              const response = await fetch(
                `https://quests.projectswhynot.site/api/v1/quests/${questid}/changegroupname`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    auth_token: userid,
                    group_name: name,
                  }),
                }
              )
                .then((response) => response.json())
                .catch((error) => console.log(error));
              if (response.status === "OK") {
                props.setTeamName(name);
                setOldName(name);
                props.setParticipantWindowActive(false);
              }
            };
            fetchData();
          }}
        >
          Изменить
        </button>{" "}
        <button
          hidden={props.typeOfParticipantWindow !== 0}
          disabled={name === ""}
          id="createTeamButton"
          onClick={(e) => {
            const fetchData = async () => {
              const response = await fetch(
                `https://quests.projectswhynot.site/api/v1/quests/${questid}/group`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    auth_token: userid,
                    group_name: name,
                  }),
                }
              )
                .then((response) => response.json())
                .catch((error) => console.log(error));
              if (response.status === "OK") {
                setClicked(true);
                props.setTeamName(name);
                props.setTeamCreator(true);
                props.setInCommand(true);
                props.setParticipantWindowActive(false);
              } else {
                setClicked(true);
                setalreadyExistTeamNameError(true);
              }
            };
            fetchData();
          }}
        >
          Создать
        </button>
        <button
          hidden={props.typeOfParticipantWindow !== 2}
          onClick={(e) => {
            const fetchData = async () => {
              const response = await fetch(
                `https://quests.projectswhynot.site/api/v1/quests/${questid}/joingroup`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    auth_token: userid,
                    group_name: name,
                  }),
                }
              )
                .then((response) => response.json())
                .catch((error) => console.log(error));
              if (response.status === "OK") {
                props.setInCommand(true);
                props.setTeamName(name);
                setName("");
                props.setParticipantWindowActive(false);
              } else {
                setClicked(true);
                setIncorrectTeamNameError(true);
              }
            };
            fetchData();
          }}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default ParticipantWindowContent;
