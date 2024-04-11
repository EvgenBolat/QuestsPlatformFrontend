import { useNavigate, useParams } from "react-router-dom";
import "./mainHeader.css";

const MainHeader = (props: any) => {
  const userid = localStorage.getItem("id");
  const navigate = useNavigate();
  let imageClassName = props.additionClass === undefined ? "mainLogo" : "mainLogo_" + props.additionClass
  return (
    <div className="header">
      <img
        id={imageClassName}
        draggable={false}
        src={`${process.env.PUBLIC_URL}/img/mainLogo.svg`}
        alt=""
      />
      <img
        draggable={false}
        className="profile"
        src={`${process.env.PUBLIC_URL}/img/userIcon.svg`}
        alt="Icon"
        onClick={() => {
          props.setProfileWindowActive(true);
        }}
      />
    </div>
  );
};

export default MainHeader;
