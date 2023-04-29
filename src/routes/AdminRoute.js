import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NoAccessPage } from "../pages/Landing";
import FullPageLoading from "../components/indicators/PrimaryLoading";
import * as ROUTES from "../constants/routes";
import * as STATUS from "../constants/status";

const AdminRoute = ({ userRole, status }) => {
  const navigatePage = (navigateTo) => {
    return <Navigate to={navigateTo} replace />;
  };

  switch (status) {
    case STATUS.SUCCESS:
      if (userRole === "admin") return <Outlet />;
      else return <NoAccessPage />;

    case STATUS.AUTH_GUEST:
      return navigatePage(ROUTES.LANDING);

    case STATUS.AUTH_NOT_LOGGED_IN:
      return navigatePage(ROUTES.LOGIN);

    default:
      return <FullPageLoading />;
  }
};

export default AdminRoute;
