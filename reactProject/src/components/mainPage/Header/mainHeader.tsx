import { useNavigate, useParams } from "react-router-dom";
import "./mainHeader.css";

const MainHeader = (props:any) => {
  const {userid} = useParams()
  const navigate = useNavigate()
  return (
    <div className="header">
      <img id="mainLogo" src={`${process.env.PUBLIC_URL}/img/mainLogo.svg`} alt="" />
      <img
      draggable={false}
        className="profile"
        src={`${process.env.PUBLIC_URL}/img/userIcon.svg`}
        alt="Icon"
        onClick={() => {props.setProfileWindowActive(true)}}
      />
    </div>
  );
};

export default MainHeader;
