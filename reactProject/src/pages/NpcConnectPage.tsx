import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NpcConnectPage = () => {
  useEffect(() => {
    if (isAuthenticated === true) {
      const fetchData = async () => {
        const data = await fetch(
          `https://quests.projectswhynot.site/api/v1/quests/${localStorage.getItem(
            "questIdParticipation"
          )}/npcjoinquest`,
          {
            method: "POST",
            body: JSON.stringify({
              auth_token: localStorage.getItem("id"),
              task_id: localStorage.getItem("taskIdParticipation"),
            }),
          }
        )
          .then((responce) => responce.json())
          .catch((error) => console.log(error));
        if (data.status === "OK") {
          console.log(data);
          localStorage.removeItem("questIdParticipation");
          localStorage.removeItem("taskIdParticipation");
          navigate(`/user/quest/${location.pathname.split("/")[2]}`, {
            replace: true,
          });
        } else {
          console.log(data);
          navigate("/user");
        }
      };
      fetchData()
      return
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
      return
    }
  },[]);
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("auth") === "true";
  const token = localStorage.getItem("id");
  const navigate = useNavigate();
  return <div></div>;
};

export default NpcConnectPage;
