import Card from "../../../genericClasses/Card"
import './QuestCard.css'
import { useNavigate, useParams } from "react-router-dom"

const QuestCard = (props:any) => {
    const {userid} = useParams()
    const navigate = useNavigate()
    console.log(`https://quests.projectswhynot.site/api/v1/static/${props.data.quest_image}`)
    return (
        <button className="ButtonCard" onClick={(e) => {
            navigate("/user/" + userid + "/quest/" + props.data.id,{state: {questName: props.data.quest_name, participation: props.participating}})
        }}>
        <Card className="QuestCard" >
            <div className="Quest_image_container">
                <img src={`https://quests.projectswhynot.site/api/v1/static/${props.data.quest_image}`} alt="Quest" />
            </div>
            <div className="QuestInfo">
                <h1>{props.data.quest_name}</h1>
                <textarea className="readDescription" readOnly={true}>{props.data.short}</textarea>
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