import { useLocation } from "react-router-dom"
import QuestFooterButton from "../../genericClasses/QuestFooterButton/QuestFooterButton"
import "./QuestFooter.css"

const QuestFooter = () => {
    const location = useLocation()
    return (
        <div id="QuestFooter">
            <QuestFooterButton typeOfButton="viewMode" questName={location.state.questName} />
            <QuestFooterButton typeOfButton = "rate" />
            <QuestFooterButton typeOfButton = "participants"/>
            <QuestFooterButton typeOfButton = "share"/>
        </div>
    )
}

export default QuestFooter