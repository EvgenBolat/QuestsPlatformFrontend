import Card from "../../../genericClasses/Card"
import './QuestCard.css'
import { useNavigate } from "react-router-dom"

const QuestCard = (props:any) => {
    const navigate = useNavigate()
    return (
        <button className="ButtonCard" onClick={(e) => {navigate("/user/" + props.userid + "/quest/" + props.data.id,{state: {questName: props.data.name}})}}>
        <Card className="QuestCard" >
            <div className="Quest_image_container">
                <img src={props.data.image} alt="Quest" />
            </div>
            <div className="QuestInfo">
                <h1>{props.data.name}</h1>
                <textarea readOnly={true}>{props.data.description}</textarea>
                <div className="QuestDate">
                    <div>Старт: {props.data.data_of_start}</div>
                    <div>Финал: {props.data.data_of_end}</div>
                </div>
            </div>
        </Card>
        </button>
    )
}

export default QuestCard