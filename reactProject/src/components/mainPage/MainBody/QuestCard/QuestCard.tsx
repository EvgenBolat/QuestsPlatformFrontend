import Card from "../../../genericClasses/Card"
import './QuestCard.css'
import { useNavigate } from "react-router-dom"

const QuestCard = (props:any) => {
    const navigate = useNavigate()
    return (
        <button className="ButtonCard" onClick={(e) => {navigate("/user/" + props.userid + "/quest/" + props.data.id,{state: {questName: props.data.quest_name, participation: props.participating}})}}>
        <Card className="QuestCard" >
            <div className="Quest_image_container">
                <img src={props.data.quest_image} alt="Quest" />
            </div>
            <div className="QuestInfo">
                <h1>{props.data.quest_name}</h1>
                <textarea readOnly={true}>{props.data.short}</textarea>
                <div className="QuestDate">
                    <div>Старт: {props.data.start_time}</div>
                    <div>Финал: {props.data.end_time}</div>
                </div>
            </div>
        </Card>
        </button>
    )
}

export default QuestCard