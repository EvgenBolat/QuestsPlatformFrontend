import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NpcConnectPage = () => {
  const { questid, taskid } = useParams();
  useEffect(() => {
    if (isAuthenticated) {
      console.log(taskid);
      navigate(`/user/${token}/quest/${location.pathname.split("/")[2]}`, {
        replace: true,
      });
    } else {
      localStorage.setItem(
        "questIdParticipation",
        `${location.pathname.split("/")[2]}`
      );
      localStorage.setItem(
        "taskIdParticipation",
        `${location.pathname.split("/")[3]}`
      );
      navigate("/login", { replace: true });
    }
  });
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("auth") === "true";
  const token = localStorage.getItem("id");
  const navigate = useNavigate();
  return <div></div>;
};

export default NpcConnectPage;
