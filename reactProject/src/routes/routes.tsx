import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import Login from "../pages/Login";
import SharingPage from "../pages/SharingPage";
import { useEffect, useState } from "react";
import NpcConnectPage from "../pages/NpcConnectPage";
import Policy from "../pages/Policy";

export const useRoutes = () => {
  const [checkedId, setCheckedId] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("id") !== null &&
      localStorage.getItem("id") !== "" &&
      userid !== localStorage.getItem("id")
    ) {
      let array = location;
      let id = localStorage.getItem("id");
      let index = location.indexOf("user");
      if (index !== -1 && id !== null) {
        array.splice(index + 1, 1, id);
        let stringURL = array.join("/");
        navigate(stringURL, { replace: true });
      }
    }
  }, [checkedId]);

  const isAuthenticated = localStorage.getItem("auth") === "true";
  const location = useLocation().pathname.split("/");
  const { userid } = useParams();
  return isAuthenticated === false ? (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/quest/:questid" element={<SharingPage />} />
      <Route path="/setnpc/:questid/:taskid" element={<NpcConnectPage />} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<PrivateRoute />} />
    </Routes>
  ) : (
    <PrivateRoute location={location} />
  );
};

export default useRoutes;
