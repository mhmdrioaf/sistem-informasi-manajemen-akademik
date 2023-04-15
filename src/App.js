import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  ResetPasswordPage,
  DashboardPage,
  PPDBRegisterPage,
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
  const [status, setStatus] = useState(STATUS.LOADING);

  // fetching user role
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const dataRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(dataRef);

          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
            setStatus(STATUS.SUCCESS);
          } else {
            setUserRole("guest");
            setStatus(STATUS.FAILED);
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
          <Route exact path={ROUTES.LANDING} element={<IndexPage />} />
          <Route path={ROUTES.MARKETPLACE} element={<h1>Marketplace</h1>} />

          {/* admin routes */}
          <Route element={<AdminRoute userRole={userRole} status={status} />}>
            <Route
              exact
              path={ROUTES.ADMIN_HOME}
              element={<AdminIndexPage />}
            />
          </Route>

          {/* 
              TODO: Create the student dashboard page, student dashboard page contains:
                - Profile
                - Schedule
                - Exams info
                - etc.
          */}

          {/* student routes */}
          <Route element={<StudentRoute userRole={userRole} status={status} />}>
            <Route
              path={ROUTES.STUDENT_DASHBOARD}
              element={<h1>Student dashboard</h1>}
            />
          </Route>

          {/* 
              TODO: Create the teacher dashboard page, teacher dashboard page contains:
                - Profile,
                - Adding exams,
                - Showing exams result,
                - Grading exams,
                - Change course schedule,
                - etc.
          */}

          {/* teacher routes */}
          <Route element={<TeacherRoute userRole={userRole} status={status} />}>
            <Route
              path={ROUTES.TEACHER_DASHBOARD}
              element={<h1>Teacher dashboard</h1>}
            />
          </Route>

          {/* 
              TODO: Create guest profile page, guest profile page contains: 
                - Name,
                - Age,
                - Email,
                - Address,
                - Phone numbers,
          */}

          {/* guest user routes */}
          <Route element={<AuthenticatedRoute status={status} />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.E_LEARNING} element={<h1>e learning</h1>} />
          </Route>

          {/* user not logged in routes */}
          <Route element={<NonAuthenticatedRoute status={status} />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PPDB_REGISTER} element={<PPDBRegisterPage />} />
            <Route
              path={ROUTES.PASSWORD_RESET}
              element={<ResetPasswordPage />}
            />
          </Route>

          {/*
              TODO: Create PPDB user role, the PPDB user role can only accessing the PPDB related page
              and also public routes.
              The PPDB user role attributes could have:
                - Name,
                - Address,
                - Page,
                - Akte kelahiran,
                - Kartu keluarga,
                - Laporan nilai SMP,
                - etc.
           */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
