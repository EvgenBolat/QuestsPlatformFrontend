import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SharingPage = () => {
  let couner = 0;
  const addParticapant = async () => {
    localStorage.removeItem("questIdParticipation");
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/quests/${
        location.pathname.split("/")[2]
      }/joinquest`,
      {
        method: "POST",
        body: JSON.stringify({ auth_token: localStorage.getItem("id") }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.status === "OK") {
      console.log(
        `/user/${localStorage.getItem("id")}/quest/${
          location.pathname.split("/")[2]
        }`
      );
      console.log("переход")
      localStorage.removeItem("questIdParticipation");
      navigate(
        `/user/${localStorage.getItem("id")}/quest/${
          location.pathname.split("/")[2]
        }`,
        {
          replace: true,
        }
      );
    }
  };
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("auth") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && couner === 0) {
      addParticapant();
      couner += 1;
    } else {
      localStorage.setItem(
        "questIdParticipation",
        `${location.pathname.split("/")[2]}`
      );
      console.log(`Ставлю айди квеста для участия обычному участнику: ${localStorage.getItem("questIdParticipation")}`)
      navigate("/login", { replace: true });
    }
  }, []);
  return <div></div>;
};

export default SharingPage;
