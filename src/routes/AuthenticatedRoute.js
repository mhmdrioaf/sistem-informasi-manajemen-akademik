import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/FirebaseContext";
import * as ROUTES from "../constants/routes";

const AuthenticatedRoute = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
