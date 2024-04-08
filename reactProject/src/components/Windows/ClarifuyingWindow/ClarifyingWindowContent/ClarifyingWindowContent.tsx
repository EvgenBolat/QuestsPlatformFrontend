import { useNavigate, useParams } from "react-router-dom";
import "./CLarifyingWindowContent.css";

const ClarifyingWindowContent = (props: any) => {
  const { questid } = useParams();
  const userid = localStorage.getItem("id")
  const DeleteQuest = async () => {
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/quests/${questid}/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ auth_token: userid }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.status === "OK") {
      props.setIsClarifyingWindowActive(false);
      navigate("/user");
      window.location.reload();
    }
  };
  const DeleteBlock = async () => {
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/block/${props.data.current.id}/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ auth_token: userid }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.status === "OK") {
      props.setTasks([])
    }
  };
  const navigate = useNavigate();
  const Dublicate =
    props.data.typeOfWindow === "dublicateBlock"
      ? () => {
          const fetchData = async () => {
            const response = await fetch(
              `https://quests.projectswhynot.site/api/v1/quests/${questid}/duplicateblock`,
              {
                method: "POST",
                body: JSON.stringify({
                  auth_token: userid,
                  block_id: props.data.current.id,
                }),
              }
            )
              .then((response) => response.json())
              .catch((error) => console.log(error));
            if (response.status === "OK") {
              let blocks = [...props.data.blocks];
              blocks.push({
                id: response.message.block_id,
                order: props.data.blocks.length,
                name: props.data.current.block_name,
                type: props.data.current.block_type,
              });
              props.data.setBlocks(blocks);
              props.setIsClarifyingWindowActive(false);
            }
          };
          fetchData();
        }
      : () => {
          const fetchData = async () => {
            const response = await fetch(
              `https://quests.projectswhynot.site/api/v1/quests/${questid}/duplicate`,
              {
                method: "POST",
                body: JSON.stringify({
                  auth_token: userid,
                }),
              }
            )
              .then((response) => response.json())
              .catch((error) => console.log(error));
            if (response.status === "OK") {
              props.setIsClarifyingWindowActive(false);
              navigate("/user");
            }
          };
          fetchData();
        };
  const Delete =
    props.data.typeOfWindow === "deleteBlock"
      ? () => {
          DeleteBlock();
          let blocks = [...props.data.blocks];
          blocks.splice(props.data.current.order, 1);
          for (let i = props.data.current.order; i < blocks.length; i++) {
            blocks[i].order = i;
          }
          props.data.setBlocks(blocks);
          props.setIsClarifyingWindowActive(false);
          props.setBlockWindowActive(false);
        }
      : () => {
          DeleteQuest();
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
