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

  const isAuthenticated = localStorage.getItem("auth") === "true";
  const location = useLocation().pathname.split("/");
  const userid = localStorage.getItem("id");
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
