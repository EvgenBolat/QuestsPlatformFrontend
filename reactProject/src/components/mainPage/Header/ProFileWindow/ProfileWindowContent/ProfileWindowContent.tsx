import { useNavigate, useParams } from "react-router-dom";
import "./ProfileWindowContent.css";

const ProfileWindowContent = (props: any) => {
  const navigate = useNavigate();
  let className = "ProfileWindowContent";
  if (props.additionClassName !== "") {
    className = "ProfileWindowContentView";
  }
  return (
    <div className={className}>
      <button
        onClick={() => {
          if (props.isSaved === false || props.isShaffled === true) {
            alert("Вы не сохранили изменения в списке блоков!");
            return;
          }
          navigate("/user/profile");
        }}
      >
        Профиль
      </button>
      <button
        onClick={() => {
          if (props.isSaved === false || props.isShaffled === true) {
            alert("Вы не сохранили изменения в списке блоков!");
            return;
          }
          navigate("/user/help");
        }}
      >
        Помощь
      </button>
    </div>
  );
};

export default ProfileWindowContent;
