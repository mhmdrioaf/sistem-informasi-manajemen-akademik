import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/FirebaseContext";

const NonAuthenticatedRoute = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Outlet />;
  }

  return <Navigate to={-1} />;
};

export default NonAuthenticatedRoute;
