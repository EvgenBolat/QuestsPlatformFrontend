import "./AddQuestWindow.css";
import AddQuestWindowContent from "./AddQuestWindowContent/AddQuestWindowContent";

const AddQuestWindow = (props: any) => {
  return (
    <div className="AddQuestWindow">
      <AddQuestWindowContent
        className="AddQuestWindowContent"
        questList={props.questList}
        setQuestList={props.setQuestList}
      />
      <button
        onClick={(e) => {
          props.setAddQuestWindowActive(false);
        }}
        className="AddQuestExitButton"
      >
        <img
          className="AddQuestExitButtonImage"
          src={`${process.env.PUBLIC_URL}/img/ExitButton.svg`}
          alt=""
        />
      </button>
    </div>
  );
};

export default AddQuestWindow;
