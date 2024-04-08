// Импортируем необходимые модули из библиотеки react-router-dom и пользовательский хук useAuth
import { Route, Routes, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Main from "../pages/Main";
import Quest from "../pages/Quest";
import Logout from "../pages/Logout";
import Profile from "../pages/Profle";
import Total from "../pages/Total";
import View from "../pages/View";
import SharingPage from "../pages/SharingPage";
import { useEffect, useState } from "react";
import NpcConnectPage from "../pages/NpcConnectPage";
import HelpPage from "../pages/HelpPage";

// Определяем функциональный компонент PrivateRoute
export const PrivateRoute = (props: any) => {
  const [checkedId, setCheckedId] = useState(false);
  const userid = localStorage.getItem("id")
  const location = useLocation().pathname.split("/");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated === true ? (
    <Routes>
      <Route path="/user" element={<Main />} />
      <Route path="/quest/:questid" element={<SharingPage />} />
      <Route path="/setnpc/:questid/:taskid" element={<NpcConnectPage />} />
      <Route path="/user">
        <Route path="quest/:questid" element={<Quest />} />
        <Route path="quest/:questid">
          <Route path="total" element={<Total />} />
          <Route path="view" element={<View />} />
        </Route>
        <Route path="help" element={<HelpPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  ) : (
    <Navigate to="/login" state={{}} />
  );
};
