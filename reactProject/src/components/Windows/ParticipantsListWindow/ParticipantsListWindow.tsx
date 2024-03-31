import ParticipantsListWindowContent from "./ParticipantsListWindowContent/ParticipantsListWindowContent";
import "./ParticipantsListWindow.css";
import { useState } from "react";


const ParticipantsListWindow = (props: any) => {
  return (
    <div id="ParticipantsListWindow">
      <div id="ParticipantsListWindowContainer">
        <ParticipantsListWindowContent AsParticipants={props.AsParticipants} isTeamCreator={props.isTeamCreator} />
        <img
        id="closeParticipantsWindow"
          onClick={(e) => {
            props.setParticipantsListWindowActive(false);
          }}
          src={`${process.env.PUBLIC_URL}/img/ExitButton.svg`}
          alt=""
        />
      </div>
    </div>
  );
};

export default ParticipantsListWindow;
