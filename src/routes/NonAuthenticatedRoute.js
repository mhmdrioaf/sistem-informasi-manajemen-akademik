import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as STATUS from "../constants/status";
import FullPageLoading from "../components/indicators/PrimaryLoading";

const NonAuthenticatedRoute = ({ status }) => {
  switch (status) {
    case STATUS.AUTH_NOT_LOGGED_IN:
      return <Outlet />;
    case STATUS.LOADING:
      return <FullPageLoading />;
    default:
      return <Navigate to={ROUTES.PROFILE} />;
  }
};

export default NonAuthenticatedRoute;
