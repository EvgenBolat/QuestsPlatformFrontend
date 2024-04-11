import { useNavigate, useParams } from "react-router-dom";
import "./ProfileWindowContent.css"

const ProfileWindowContent = (props: any) => {
    const navigate= useNavigate()
    let className = "ProfileWindowContent"
    if(props.additionClassName !== ""){
      className = "ProfileWindowContentView"
    }
    console.log(className)
    return (
      <div className={className}>
        <button onClick={() => {navigate("/user/profile")}}>Профиль</button>
        <button onClick={() => {navigate("/user/help")}}>Помощь</button>
      </div>
    );
  };
  
  export default ProfileWindowContent;
  