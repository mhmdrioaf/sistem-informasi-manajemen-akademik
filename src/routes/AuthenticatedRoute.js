import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as STATUS from "../constants/status";
import FullPageLoading from "../components/indicators/PrimaryLoading";

const AuthenticatedRoute = ({ status }) => {
  switch (status) {
    case STATUS.SUCCESS:
      return <Outlet />;
    case STATUS.LOADING:
      return <FullPageLoading />;
    default:
      return <Navigate to={ROUTES.LOGIN} replace />;
  }
};

export default AuthenticatedRoute;
