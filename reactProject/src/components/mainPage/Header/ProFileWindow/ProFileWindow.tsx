import ProfileWindowContent from "./ProfileWindowContent/ProfileWindowContent";
import "./ProfileWindow.css"
const ProfileWindow = (props: any) => {
  return (
    <div>
    <button className="BackgroungProfileWindowContent" onClick={(e) =>{props.setProfileWindowActive(false)}}>
      <ProfileWindowContent  />
    </button>
    </div>
  );
};

export default ProfileWindow;
