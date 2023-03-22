import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage, LoginPage, ResetPasswordPage } from "./pages";
import { AuthProvider } from "./contexts/FirebaseContext";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   () => JSON.parse(localStorage.getItem("user")) || false
  // );

  const isAuthenticated = JSON.parse(localStorage.getItem("user")) || false;

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            }
          />
          <Route
            path="/resetPassword"
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
