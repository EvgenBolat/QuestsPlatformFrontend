import { useNavigate } from "react-router-dom";
import "./ProfileHeader.css"
const ProfileHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="ProfileHeader">
      <button
        className="exitToQuestButton"
        onClick={(e) => {
          navigate(-1);
        }}
      >
        <img
          className="exitToQuestButtonImage"
          src={`${process.env.PUBLIC_URL}/img/exitToMainButton.svg`}
          alt=""
        />
      </button>
    </div>
  );
};

export default ProfileHeader;
