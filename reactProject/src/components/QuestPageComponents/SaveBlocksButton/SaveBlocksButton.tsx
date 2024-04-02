import { useState } from "react";
import "./SaveBlockButton.css";
import { useParams } from "react-router-dom";

const SaveBlockButton = (props: any) => {
  const {userid, questid} = useParams()
  const fetchBlocks = async () =>{
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/quests/${questid}/blocks`,
      {
        method: "PUT",
        body: JSON.stringify({
          auth_token: userid,
          blocks_list: props.blocks
        }),
      })
      console.log(response)
  }
  return (
    <div
      className="SaveBlockButton"
      style={props.isSaveButtonActive ? { left: -80 } : {}}
      onClick={(e) => {
        fetchBlocks()
        props.setSaveButtonActive(false);
      }}
    >
      <div className="SaveBlockButtonBody">Сохранить изменения</div>
    </div>
  );
};

export default SaveBlockButton;
