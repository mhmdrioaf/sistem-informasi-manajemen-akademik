import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, ResetPasswordPage, DashboardPage } from "./pages";
import IndexPage from "./pages/index";
import { AuthProvider } from "./contexts/FirebaseContext";
import { AuthenticatedRoute, NonAuthenticatedRoute } from "./routes";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path={ROUTES.LANDING} element={<IndexPage />} />

          {/* user not logged in routes */}
          <Route element={<NonAuthenticatedRoute />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTES.PASSWORD_RESET}
              element={<ResetPasswordPage />}
            />
          </Route>

          {/* user logged in routes */}
          <Route element={<AuthenticatedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.E_LEARNING} element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
