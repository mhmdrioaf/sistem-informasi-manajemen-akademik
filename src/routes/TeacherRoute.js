import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import FullPageLoading from "../components/indicators/PrimaryLoading";
import * as ROUTES from "../constants/routes";
import * as STATUS from "../constants/status";

function TeacherRoute({ userRole, status }) {
  switch (status) {
    case STATUS.SUCCESS:
      if (userRole === "teacher" || userRole === "admin") return <Outlet />;
      else return <Navigate to={ROUTES.LANDING} />;
    case STATUS.FAILED:
      return <Navigate to={ROUTES.LANDING} />;
    case STATUS.AUTH_NOT_LOGGED_IN:
      return <Navigate to={ROUTES.LOGIN} />;
    default:
      return <FullPageLoading />;
  }
}

export default TeacherRoute;
