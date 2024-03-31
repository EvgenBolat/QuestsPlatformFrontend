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

// Определяем функциональный компонент PrivateRoute
export const PrivateRoute = (props: any) => {
  const [checkedId, setCheckedId] = useState(false);
  const {userid} = useParams()
  const location = useLocation().pathname.split("/");
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
  return isAuthenticated === true ? (
    <Routes>
      <Route path="/user/:userid" element={<Main />} />
      <Route path="/quest/:questid" element={<SharingPage />} />
      <Route path="/setnpc/:questid/:taskid" element={<NpcConnectPage />} />
      <Route path="/user/:userid">
        <Route path="quest/:questid" element={<Quest />} />

        <Route path="quest/:questid">
          <Route path="total" element={<Total />} />
          <Route path="view" element={<View />} />
        </Route>

        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/user/:userid" replace />} />
    </Routes>
  ) : (
    <Navigate to="/login" state={{}} />
  );
};
