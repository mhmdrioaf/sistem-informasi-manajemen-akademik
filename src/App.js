import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage, ResetPasswordPage, DashboardPage } from "./pages";
import IndexPage from "./pages/index";
import { AuthProvider } from "./contexts/FirebaseContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import * as ROUTES from "./constants/routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(user);
      } else {
        setIsAuthenticated(null);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path={ROUTES.LANDING} element={<IndexPage />} />
          <Route
            path={ROUTES.LOGIN}
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              isAuthenticated ? (
                <DashboardPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path={ROUTES.E_LEARNING}
            element={
              isAuthenticated ? (
                <DashboardPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path={ROUTES.PASSWORD_RESET}
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <ResetPasswordPage />
              )
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
