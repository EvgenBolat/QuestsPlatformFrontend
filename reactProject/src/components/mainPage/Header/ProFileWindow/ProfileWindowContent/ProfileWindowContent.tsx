import { useNavigate, useParams } from "react-router-dom";
import "./ProfileWindowContent.css"

const ProfileWindowContent = (props: any) => {
  const userid = localStorage.getItem("id")
    const navigate= useNavigate()
    return (
      <div className="ProfileWindowContent">
        <button onClick={() => {navigate("/user/profile")}}>Профиль</button>
        <button>Настройки</button>
      </div>
    );
  };
  
  export default ProfileWindowContent;
  