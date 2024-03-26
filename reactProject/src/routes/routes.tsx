import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import Login from '../pages/Login';

export const useRoutes = () => {

  const isAuthenticated =  localStorage.getItem("auth") === "true"
  return (
    isAuthenticated === false ?
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path='*' element={<PrivateRoute />} />
    </Routes> :
    <PrivateRoute />
  )
}

export default useRoutes
