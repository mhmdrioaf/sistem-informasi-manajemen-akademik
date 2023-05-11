import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useAuth } from "../contexts/FirebaseContext";

const AuthenticatedRoute = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
