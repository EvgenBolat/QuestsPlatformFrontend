import { useState } from "react";
import "./SaveBlockButton.css";
import { useParams } from "react-router-dom";

const SaveBlockButton = (props: any) => {
  const { questid} = useParams()
  const userid = localStorage.getItem("id")
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
  }
  return (
    <div
      className="SaveBlockButton"
      style={props.isSaveButtonActive ? { left: -70 } : {}}
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
