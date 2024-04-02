import { useNavigate, useParams } from "react-router-dom";
import "./CLarifyingWindowContent.css";

const ClarifyingWindowContent = (props: any) => {
  const { userid, questid } = useParams();
  const DeleteQuest = async () => {
    const response = await fetch(`https://quests.projectswhynot.site/api/v1/quests/${questid}/delete`, {
      method: "DELETE",
      body: JSON.stringify({ auth_token: userid }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
      if(response.status === "OK"){
        props.setIsClarifyingWindowActive(false);
        navigate("/user/" + userid)
        window.location.reload()
      }
  };
  const navigate = useNavigate()
  const Dublicate =
    props.data.typeOfWindow === "dublicateBlock"
      ? () => {
          //посылаем серваку команду дублирования по айди
          let blocks = [...props.data.blocks];

          blocks.splice(props.data.current.order + 1, 0, {
            id: props.data.current.id,
            order: props.data.current.order,
            name: props.data.current.name,
            type: props.data.current.type,
          });
          for (let i = props.data.current.order + 1; i < blocks.length; i++) {
            blocks[i].order = i;
          }
          props.data.setBlocks(blocks);
          props.setIsClarifyingWindowActive(false);
        }
      : () => {
          console.log("Дублирование квеста: " + questid + ", " + userid);
          props.setIsClarifyingWindowActive(false);
        };
  const Delete =
    props.data.typeOfWindow === "deleteBlock"
      ? () => {
          //посылаем серваку команду удаления по айди
          let blocks = [...props.data.blocks];
          blocks.splice(props.data.current.order, 1);
          for (let i = props.data.current.order; i < blocks.length; i++) {
            blocks[i].order = i;
          }
          console.log(blocks);
          props.data.setBlocks(blocks);
          props.setIsClarifyingWindowActive(false);
          props.setBlockWindowActive(false);
        }
      : () => {
          console.log("Удаление квеста: " + questid + ", " + userid);
          DeleteQuest()
        };

  function Act() {
    if (props.data.typeOfAction === "dublicate") {
      Dublicate();
    } else {
      Delete();
    }
  }
  return (
    <div className="ClarifyingWindowContent">
      <h1>
        Вы уверены, что хотите{" "}
        {props.data.typeOfAction === "dublicate" ? "дублировать" : "удалить"}{" "}
        {props.data.typeOfWindow === "dublicateBlock" ||
        props.data.typeOfWindow === "deleteBlock"
          ? "блок"
          : "квест"}
        ?
      </h1>
      <div>
        <button>Нет</button>
        <button onClick={(e) => Act()}>Да</button>
      </div>
    </div>
  );
};

export default ClarifyingWindowContent;
