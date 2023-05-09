import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import FullPageLoading from "./components/indicators/PrimaryLoading";
import * as ROUTES from "./constants/routes";
import * as STATUS from "./constants/status";
import { AuthProvider } from "./contexts/FirebaseContext";
import { auth, db } from "./firebase";
import {
  AdminRoute,
  AuthenticatedRoute,
  NonAuthenticatedRoute,
  SellerRoute,
} from "./routes";
import UserCart from "./pages/user/cart/UserCart";

const LoginPage = lazy(() => import("./pages/login/Login"));
const MarketplacePage = lazy(() => import("./pages/marketplace/Marketplace"));
const MarketplaceCategoryPage = lazy(() =>
  import("./pages/marketplace/MarketplaceCategory")
);
const RegisterPage = lazy(() => import("./pages/register/Register"));
const ResetPasswordPage = lazy(() =>
  import("./pages/reset_password/ResetPassword")
);
const SellerPage = lazy(() => import("./pages/user/seller/Seller"));
const UserPage = lazy(() => import("./pages/user/User"));
const AdminPage = lazy(() => import("./pages/admin/Admin"));
const ProductDetailPage = lazy(() =>
  import("./pages/marketplace/products/ProductDetail")
);
const LandingPage = lazy(() => import("./pages/Landing"));
const ChatPage = lazy(() => import("./pages/user/chat/Chat"));

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user?.uid), (doc) => {
          setUserDesc(doc.data());
        });
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
            element={
              <Suspense fallback={<FullPageLoading />}>
                <LandingPage currentUser={currentUser} />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MARKETPLACE}
            element={
              <Suspense fallback={<FullPageLoading />}>
                <MarketplacePage
                  currentUser={currentUser}
                  userDesc={userDesc}
                />
              </Suspense>
            }
          />
          <Route
            path={"/product/:productId"}
            element={
              <Suspense fallback={<FullPageLoading />}>
                <ProductDetailPage
                  currentUser={currentUser}
                  userDesc={userDesc}
                />
              </Suspense>
            }
          />

          <Route
            path="/marketplace/category/:category"
            element={
              <Suspense fallback={<FullPageLoading />}>
                <MarketplaceCategoryPage
                  currentUser={currentUser}
                  userDesc={userDesc}
                />
              </Suspense>
            }
          />

          <Route
            element={
              <Suspense fallback={<FullPageLoading />}>
                <AdminRoute userRole={userRole} status={status} />
              </Suspense>
            }
          >
            <Route exact path={ROUTES.ADMIN_HOME} element={<AdminPage />} />
          </Route>

          <Route
            element={
              <Suspense fallback={<FullPageLoading />}>
                <SellerRoute userRole={userRole} status={status} />
              </Suspense>
            }
          >
            <Route
              path={ROUTES.SELLER_HOME}
              element={
                <SellerPage currentUser={currentUser} userDesc={userDesc} />
              }
            />
          </Route>

          <Route
            element={
              <Suspense fallback={<FullPageLoading />}>
                <AuthenticatedRoute status={status} />
              </Suspense>
            }
          >
            <Route
              path={ROUTES.USER_HOME}
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <UserPage currentUser={currentUser} userDesc={userDesc} />
                </Suspense>
              }
            />

            <Route
              path={ROUTES.USER_CART}
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <UserCart currentUser={currentUser} userDesc={userDesc} />
                </Suspense>
              }
            />

            <Route
              path="/chat/:userId"
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <ChatPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            element={
              <Suspense fallback={<FullPageLoading />}>
                <NonAuthenticatedRoute status={status} />
              </Suspense>
            }
          >
            <Route
              path={ROUTES.LOGIN}
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.REGISTER}
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <RegisterPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.PASSWORD_RESET}
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <ResetPasswordPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
