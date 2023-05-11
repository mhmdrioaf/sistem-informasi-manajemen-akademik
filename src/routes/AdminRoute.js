import React from "react";
import { Outlet } from "react-router-dom";
import { NotFoundPage } from "../pages/Landing";
import { useAuth } from "../contexts/FirebaseContext";

const AdminRoute = () => {
  const { userRole } = useAuth();

  if (userRole !== "admin") {
    return <NotFoundPage />;
  } else {
    return <Outlet />;
  }
};

export default AdminRoute;
