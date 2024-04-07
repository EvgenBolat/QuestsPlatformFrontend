import { useNavigate, useParams } from "react-router-dom";
import "./QuestFooterButton.css"

const QuestFooterButton = (props: any) => {
    const {userid, questid} = useParams()
    let src;
    let text;
    const navigate = useNavigate()
    function hadleClick(){
        if(props.typeOfButton === "rate"){
            //todo проверка на дату окончания квеста
            navigate('/user/' + userid + "/quest/" + questid + "/total")
        }
        else if(props.typeOfButton === "viewMode"){
            navigate('/user/' + userid + "/quest/" + questid + "/view", {state: {type: "quest", questName: props.questName}})
        }
        else if(props.typeOfButton === "participants"){
            console.log(props.setParticipantsListWindowActive)
            props.setParticipantsListWindowActive(true)
        }
        else if(props.typeOfButton === "share"){
            navigator.clipboard.writeText(`https://quests.projectswhynot.site/quest/${questid}`) // `http://localhost:3000/quest/${questid}`
            console.log("shared")
            alert("Ссылка на квест скопирована!")
        }
        return
    }
    function setValues(){
        if(props.typeOfButton === "viewMode"){
            src = `${process.env.PUBLIC_URL}/img/closedEye.svg`
            text= "Режим отображения"
        }
        else if (props.typeOfButton === "rate"){
            src = `${process.env.PUBLIC_URL}/img/rate.svg`
            text= "Рейтинг"
        }
        else if(props.typeOfButton === "participants"){
            src = `${process.env.PUBLIC_URL}/img/participants.svg`
            text= "Участники"
        }
        else{
            src = `${process.env.PUBLIC_URL}/img/shareIcon.svg`
            text= "Поделиться"
        }
    }

    setValues()
  return (
    <div className="QuestFooterButton">
      <img onClick={(e) => {hadleClick()}} draggable={false} src={src} alt="im" />
      <p>{text}</p>
    </div>
  );
};

export default QuestFooterButton;
