import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import FullPageLoading from "../components/indicators/PrimaryLoading";
import * as ROUTES from "../constants/routes";
import * as STATUS from "../constants/status";

const NonAuthenticatedRoute = ({ status }) => {
  switch (status) {
    case STATUS.AUTH_NOT_LOGGED_IN:
      return <Outlet />;
    case STATUS.LOADING:
      return <FullPageLoading />;
    default:
      return <Navigate to={ROUTES.USER_HOME} />;
  }
};

export default NonAuthenticatedRoute;
