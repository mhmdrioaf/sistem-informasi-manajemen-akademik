import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import FullPageLoading from "../components/indicators/PrimaryLoading";
import * as ROUTES from "../constants/routes";
import * as STATUS from "../constants/status";
import { NoAccessPage } from "../pages";

function SellerRoute({ userRole, status }) {
  switch (status) {
    case STATUS.SUCCESS:
      if (userRole === ("admin" || "student" || "teacher")) return <Outlet />;
      else return <NoAccessPage />;
    case STATUS.AUTH_GUEST:
      return <NoAccessPage />
    case STATUS.AUTH_NOT_LOGGED_IN:
      return <Navigate to={ROUTES.LOGIN} />;
    default:
      return <FullPageLoading />;
  }
}

export default SellerRoute;
