import { useState } from "react";
import "./SaveTasksOrderButton.css";
import { useParams } from "react-router-dom";

const SaveTasksOrderButton = (props: any) => {
  const { userid } = useParams();
  return (
    <div
      className="SaveTasksOrderButton"
      onClick={(e) => {
        console.log(
          JSON.stringify({
            auth_token: userid,
            tasks_list: props.tasks,
          })
        );
        const changeTasksOrder = async () => {
          const response = await fetch(
            `https://quests.projectswhynot.site/api/v1/block/${props.blockWindowID}/tasks`,
            {
              method: "PUT",
              body: JSON.stringify({
                auth_token: userid,
                tasks_list: props.tasks,
              }),
            }
          )
            .then((response) => response.json())
            .catch((error) => console.log(error));
          if (response.status === "OK") {
            console.log(response);
          }
        };
        changeTasksOrder();
        props.setSaveTasksOrderButtonActive(false);
      }}
    >
      <div className="SaveTasksOrderButtonBody">Сохранить изменения</div>
    </div>
  );
};

export default SaveTasksOrderButton;
