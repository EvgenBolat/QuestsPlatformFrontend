import { useLocation } from "react-router-dom";
import QuestFooterButton from "../../genericClasses/QuestFooterButton/QuestFooterButton";
import "./QuestFooter.css";

const QuestFooter = (props: any) => {
  return (
    <div id="QuestFooter">
      <QuestFooterButton typeOfButton="viewMode" questName={props.questName} />
      <QuestFooterButton typeOfButton="rate" />
      <QuestFooterButton
        typeOfButton="participants"
        setParticipantsListWindowActive={props.setParticipantsListWindowActive}
      />
      <QuestFooterButton typeOfButton="share" />
    </div>
  );
};

export default QuestFooter;
