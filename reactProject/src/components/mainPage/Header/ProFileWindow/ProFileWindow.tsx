import ProfileWindowContent from "./ProfileWindowContent/ProfileWindowContent";
import "./ProfileWindow.css";
const ProfileWindow = (props: any) => {
  let additionClassName = "";
  if (props.additionClassName) {
    additionClassName = props.additionClassName;
  }
  return (
    <div>
      <button
        className="BackgroungProfileWindowContent"
        onClick={(e) => {
          props.setProfileWindowActive(false);
        }}
      >
        <ProfileWindowContent
          isSaved={props.isSaved}
          isShaffled={props.isShaffled}
          additionClassName={additionClassName}
        />
      </button>
    </div>
  );
};

export default ProfileWindow;
