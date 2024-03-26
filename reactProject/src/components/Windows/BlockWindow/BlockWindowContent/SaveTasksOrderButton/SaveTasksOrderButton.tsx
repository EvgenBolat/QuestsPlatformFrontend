import { useState } from "react";
import "./SaveTasksOrderButton.css";

const SaveTasksOrderButton = (props: any) => {
  return (
    <div
      className="SaveTasksOrderButton"
      onClick={(e) => {
        props.setSaveTasksOrderButtonActive(false);
        //действия на сервак
      }}
    >
      <div className="SaveTasksOrderButtonBody">Сохранить изменения</div>
    </div>
  );
};

export default SaveTasksOrderButton;
