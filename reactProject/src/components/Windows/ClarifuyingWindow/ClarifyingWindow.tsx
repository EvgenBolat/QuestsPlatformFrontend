import ClarifyingWindowContent from "./ClarifyingWindowContent/ClarifyingWindowContent";
import "./ClarifyingWindow.css";
const ClarifyingWindow = (props: any) => {
  return (
    <div
      className="ClarifyingWindow"
      onClick={(e) => props.setIsClarifyingWindowActive(false)}
    >
      <ClarifyingWindowContent
        typeOfWindow={props.typeOfWindow}
        typeOfAction={props.typeOfAction}
        data={props.data}
        setIsClarifyingWindowActive={props.setIsClarifyingWindowActive}
        setBlockWindowActive={props.setBlockWindowActive}
        setTasks={props.setTasks}
      />
    </div>
  );
};

export default ClarifyingWindow;
