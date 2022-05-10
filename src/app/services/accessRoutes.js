import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as authService from '../auth/auth.service'

const ProtectedRoutes = () => {

  function validateToken() {
    try {
      let token = authService.getUserToken();
      if (token != null && token !== "" && token !== 'null' && token !== undefined) {
        return true;
      }
    } catch (error) {
      console.log("Acceso denegado.");
      return false;
    }
  };

  const useAuth = () => {
    const user = { loggedIn: validateToken()};
    return user && user.loggedIn;
  };

  const isAuth = useAuth();

  return (
    <div>
      {
        isAuth ? <Outlet/> : <Navigate to="/"/>
      }
    </div>
  );
};

export default ProtectedRoutes;