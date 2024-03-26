import { useState } from "react";
import "./SaveBlockButton.css";

const SaveBlockButton = (props: any) => {
  return (
    <div
      className="SaveBlockButton"
      style={props.isSaveButtonActive ? { left: -80 } : {}}
      onClick={(e) => {
        props.setSaveButtonActive(false);
        //действия на сервак
      }}
    >
      <div className="SaveBlockButtonBody">Сохранить изменения</div>
    </div>
  );
};

export default SaveBlockButton;
