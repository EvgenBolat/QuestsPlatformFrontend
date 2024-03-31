import { useState } from "react";
import "./ParticipantWindowContent.css";

const ParticipantWindowContent = (props: any) => {
  const [oldname, setOldName] = useState(props.teamName);
  const [name, setName] = useState(props.teamName);
  const [incorrectTeamNameError, setIncorrectTeamNameError] = useState(false);

  const [alreadyExistTeamNameError, setalreadyExistTeamNameError] =
    useState(false);
  let className = "participateButtonsContainer";

  const [clicked, setClicked] = useState(false);
  if (props.typeOfParticipantWindow === 0) {
    className += " CreateTeamButton";
    console.log(className);
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
            props.setTeamCreator(false);
            props.setInCommand(false);
            props.setParticipantWindowActive(false);
            props.setTeamName("");
          }}
        >
          Удалить
        </button>
        <button
          hidden={props.typeOfParticipantWindow !== 1}
          disabled={oldname === name}
          id="ChangedNameButton"
          onClick={(e) => {
            props.setTeamName(name);
            setOldName(name);
            props.setParticipantWindowActive(false);
          }}
        >
          Изменить
        </button>{" "}
        <button
          hidden={props.typeOfParticipantWindow !== 0}
          disabled={name === ""}
          id="createTeamButton"
          onClick={(e) => {
            //TODO: добавить проверку с сервера
            if (true) {
              setClicked(true);
              props.setTeamName(name);
              props.setTeamCreator(true);
              props.setInCommand(true);
              props.setParticipantWindowActive(false);
            } else {
              setClicked(true);
              setalreadyExistTeamNameError(true);
            }
          }}
        >
          Создать
        </button>
        <button
          hidden={props.typeOfParticipantWindow !== 2}
          onClick={(e) => {
            if (false) {
              props.setInCommand(true);
              props.setTeamName(name);
              setName("");
              props.setParticipantWindowActive(false);
            } else {
              setClicked(true);
              setIncorrectTeamNameError(true);
            }
          }}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default ParticipantWindowContent;
