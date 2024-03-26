import { useState } from "react";
import Card from "../../genericClasses/Card";
import "./QuestHeader.css";
import { useLocation } from "react-router-dom";

const QuestHeader = (props: any) => {
  const location = useLocation()
  return (
    <div>
      <div className="QuestHeader">
        <div className="QuestHeaderName">{location.state.questName}</div>
        <button className="ActionQuestButton" onClick={(e) => {props.setActionMenuOpen(true); props.setLeftPosition(e.pageX); props.setTopPosition(e.pageY)}}>
          <img src={`${process.env.PUBLIC_URL}/img/ActionButton.svg`} alt="" />
        </button>
      </div>
    </div>
  );
};

export default QuestHeader;
