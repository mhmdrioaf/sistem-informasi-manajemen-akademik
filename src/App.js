import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  ResetPasswordPage,
  RegisterPage,
  UserPage,
  MarketplacePage,
} from "./pages";
import IndexPage from "./pages/index";
import AdminIndexPage from "./pages/admin";
import { AuthProvider } from "./contexts/FirebaseContext";
import {
  AuthenticatedRoute,
  NonAuthenticatedRoute,
  AdminRoute,
  StudentRoute,
  TeacherRoute,
} from "./routes";
import * as ROUTES from "./constants/routes";
import * as STATUS from "./constants/status";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

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
          <Route path={ROUTES.MARKETPLACE} element={<MarketplacePage />} />

          {/* admin routes */}
          <Route element={<AdminRoute userRole={userRole} status={status} />}>
            <Route
              exact
              path={ROUTES.ADMIN_HOME}
              element={<AdminIndexPage />}
            />
          </Route>

          {/* student routes */}
          <Route element={<StudentRoute userRole={userRole} status={status} />}>
            <Route
              path={ROUTES.STUDENT_DASHBOARD}
              element={<h1>Student dashboard</h1>}
            />
          </Route>

          {/* teacher routes */}
          <Route element={<TeacherRoute userRole={userRole} status={status} />}>
            <Route
              path={ROUTES.TEACHER_DASHBOARD}
              element={<h1>Teacher dashboard</h1>}
            />
          </Route>

          {/* auntheticated user routes */}
          <Route element={<AuthenticatedRoute status={status} />}>
            <Route
              path={ROUTES.USER_HOME}
              element={<UserPage currentUser={currentUser} userDesc={userDesc} />}
            />
          </Route>

          {/* user not logged in routes */}
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
