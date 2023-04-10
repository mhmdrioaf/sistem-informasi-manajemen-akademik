import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as STATUS from "../constants/status";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import FullPageLoading from "../components/indicators/PrimaryLoading";
import { onAuthStateChanged } from "firebase/auth";

const AdminRoute = () => {
  const [userRole, setUserRole] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserInfo = async () => {
          const userRef = doc(db, "users", user?.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setStatus(STATUS.AUTH_SUCCESS);
            setUserRole(userSnap.data().role);
          } else {
            setStatus(STATUS.FIRESTORE_NO_DATA_FOUND);
          }
        };

        fetchUserInfo();
      } else {
        setStatus(STATUS.AUTH_NOT_LOGGED_IN);
      }
    });
  }, []);

  switch (status) {
    case STATUS.AUTH_SUCCESS:
      if (userRole === "admin") {
        return <Outlet />;
      } else if (userRole === "student") {
        return <Navigate to="/student" replace />;
      } else if (userRole === "teacher") {
        return <Navigate to="/teacher" replace />;
      } else {
        return <Navigate to={ROUTES.DASHBOARD} />;
      }
    case STATUS.AUTH_NOT_LOGGED_IN || STATUS.FIRESTORE_NO_DATA_FOUND:
      return <Navigate to={ROUTES.LOGIN} replace />;
    default:
      return <FullPageLoading />;
  }
};

export default AdminRoute;
