import { useLocation } from "react-router-dom";
import QuestFooterButton from "../../genericClasses/QuestFooterButton/QuestFooterButton";
import "./QuestFooter.css";

const QuestFooter = (props: any) => {
  return (
    <div id="QuestFooter">
      <QuestFooterButton
        typeOfButton="viewMode"
        isSaved={props.isSaved}
        isShaffled={props.isShaffled}
        questName={props.questName}
      />
      <QuestFooterButton
        typeOfButton="rate"
        isSaved={props.isSaved}
        isShaffled={props.isShaffled}
      />
      <QuestFooterButton
        typeOfButton="participants"
        isSaved={props.isSaved}
        isShaffled={props.isShaffled}
        setParticipantsListWindowActive={props.setParticipantsListWindowActive}
      />
      <QuestFooterButton
        typeOfButton="share"
        isSaved={props.isSaved}
        isShaffled={props.isShaffled}
      />
    </div>
  );
};

export default QuestFooter;
