import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import * as ROUTES from "./constants/routes";
import * as STATUS from "./constants/status";
import { AuthProvider } from "./contexts/FirebaseContext";
import { auth, db } from "./firebase";
import {
  LoginPage,
  MarketplacePage,
  RegisterPage,
  ResetPasswordPage,
  SellerPage,
  UserPage,
} from "./pages";
import AdminIndexPage from "./pages/admin";
import IndexPage from "./pages/index";
import {
  AdminRoute,
  AuthenticatedRoute,
  NonAuthenticatedRoute,
  SellerRoute,
} from "./routes";

function App() {
  const [userRole, setUserRole] = useState("guest");
  const [userDesc, setUserDesc] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  // fetching user role
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const fetchUser = async () => {
          const dataRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(dataRef);

          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
            setUserDesc(docSnap.data());
            setStatus(STATUS.SUCCESS);
          } else {
            setUserRole("guest");
            setStatus(STATUS.AUTH_GUEST);
          }
        };

        fetchUser();
      } else {
        setStatus(STATUS.AUTH_NOT_LOGGED_IN);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* public route */}
          <Route
            exact
            path={ROUTES.LANDING}
            element={<IndexPage currentUser={currentUser} />}
          />
          <Route path={ROUTES.MARKETPLACE} element={<MarketplacePage currentUser={currentUser} userDesc={userDesc} />} />

          <Route element={<AdminRoute userRole={userRole} status={status} />}>
            <Route
              exact
              path={ROUTES.ADMIN_HOME}
              element={<AdminIndexPage />}
            />
          </Route>

          <Route element={<SellerRoute userRole={userRole} status={status} />}>
            <Route
              path={ROUTES.SELLER_HOME}
              element={<SellerPage currentUser={currentUser} userDesc={userDesc} />}
            />
          </Route>

          <Route element={<AuthenticatedRoute status={status} />}>
            <Route
              path={ROUTES.USER_HOME}
              element={<UserPage currentUser={currentUser} userDesc={userDesc} />}
            />
          </Route>

          <Route element={<NonAuthenticatedRoute status={status} />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route
              path={ROUTES.PASSWORD_RESET}
              element={<ResetPasswordPage />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
