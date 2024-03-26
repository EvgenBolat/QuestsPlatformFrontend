// Импортируем необходимые модули из библиотеки react-router-dom и пользовательский хук useAuth
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import Quest from "../pages/Quest";
import Logout from "../pages/Logout";
import Profile from "../pages/Profle";
import Total from "../pages/Total";
import View from "../pages/View";

// Определяем функциональный компонент PrivateRoute
export const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated === true ? (
    <Routes>
      <Route path="/user/:userid" element={<Main />} />

      <Route path="/user/:userid">
        <Route path="quest/:questid" element={<Quest />} />

        <Route path="quest/:questid">
          <Route path="total" element={<Total />} />
          <Route path="view" element={<View />} />
        </Route>

        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/user/:userid" replace />} />
      </Route>
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/user/:userid" replace />} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};
