import ParticipantWindowContent from "./ParticipantWindowContent/ParticipantWindowContent";
import "./ParticipantWindow.css";
const ParticipantWindow = (props: any) => {
  return (
    <div id="ParticipantWindow">
      <ParticipantWindowContent
        setInCommand={props.setInCommand}
        setTeamName={props.setTeamName}
        setTeamCreator={props.setTeamCreator}
        typeOfParticipantWindow={props.typeOfParticipantWindow}
        setParticipantWindowActive={props.setParticipantWindowActive}
        teamName={props.teamName}
      />
      <img
        onClick={(e) => {
          props.setParticipantWindowActive(false);
        }}
        src={`${process.env.PUBLIC_URL}/img/ExitButton.svg`}
        alt=""
      />
    </div>
  );
};

export default ParticipantWindow;
