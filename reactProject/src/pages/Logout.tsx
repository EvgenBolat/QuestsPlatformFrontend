import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Logout() {
  const { setAuth } = useAuth();

  return (
    <button
      onClick={() => {
        setAuth(false);
        localStorage.removeItem("id");
        localStorage.setItem("auth", JSON.stringify(false));
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
