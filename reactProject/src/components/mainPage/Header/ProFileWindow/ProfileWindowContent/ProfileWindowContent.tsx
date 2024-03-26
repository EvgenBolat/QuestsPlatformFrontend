import { useNavigate, useParams } from "react-router-dom";
import "./ProfileWindowContent.css"

const ProfileWindowContent = (props: any) => {
    const {userid} = useParams()
    const navigate= useNavigate()
    return (
      <div className="ProfileWindowContent">
        <button onClick={() => {navigate("/user/" + userid + "/profile")}}>Профиль</button>
        <button>Настройки</button>
      </div>
    );
  };
  
  export default ProfileWindowContent;
  