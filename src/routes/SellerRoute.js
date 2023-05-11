import React from "react";
import { Outlet } from "react-router-dom";
import { NotFoundPage } from "../pages/Landing";
import { useAuth } from "../contexts/FirebaseContext";

function SellerRoute() {
  const { userRole } = useAuth();

  if (userRole === ("admin" || "student" || "teacher")) return <Outlet />;
  else return <NotFoundPage />;
}

export default SellerRoute;
