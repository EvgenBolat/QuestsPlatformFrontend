import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Logout() {
  const { setAuth } = useAuth()
  const navigate = useNavigate();

  return (
    <button onClick={() => {setAuth(false); localStorage.setItem("auth", JSON.stringify(false)); window.location.reload();}}>Logout</button>
  )
}

export default Logout
