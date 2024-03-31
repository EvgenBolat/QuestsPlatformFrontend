import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SharingPage = () => {
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/user/${token}/quest/${location.pathname.split("/")[2]}`, {
        replace: true,
      });
    } else {
      localStorage.setItem(
        "questIdParticipation",
        `${location.pathname.split("/")[2]}`
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

export default SharingPage;
