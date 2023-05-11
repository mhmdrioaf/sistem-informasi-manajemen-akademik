import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import FullPageLoading from "./components/indicators/PrimaryLoading";
import * as ROUTES from "./constants/routes";
import { AuthProvider } from "./contexts/FirebaseContext";
import { auth, db } from "./firebase";
import {
  AdminRoute,
  AuthenticatedRoute,
  NonAuthenticatedRoute,
  SellerRoute,
} from "./routes";
import UserCart from "./pages/user/cart/UserCart";
import { MarketplaceProvider } from "./contexts/MarketplaceContext";
import { NotFoundPage } from "./pages/Landing";

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
  const [userDesc, setUserDesc] = useState({});

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
          <Route path="*" element={<NotFoundPage />} />

          {/* public route */}
          <Route
            exact
            path={ROUTES.LANDING}
            element={
              <Suspense fallback={<FullPageLoading />}>
                <LandingPage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MARKETPLACE}
            element={
              <MarketplaceProvider>
                <Suspense fallback={<FullPageLoading />}>
                  <MarketplacePage userDesc={userDesc} />
                </Suspense>
              </MarketplaceProvider>
            }
          />
          <Route
            path="/marketplace/category/:category"
            element={
              <MarketplaceProvider>
                <Suspense fallback={<FullPageLoading />}>
                  <MarketplaceCategoryPage userDesc={userDesc} />
                </Suspense>
              </MarketplaceProvider>
            }
          />
          <Route
            path={"/product/:productId"}
            element={
              <Suspense fallback={<FullPageLoading />}>
                <ProductDetailPage userDesc={userDesc} />
              </Suspense>
            }
          />

          <Route
            element={
              <Suspense fallback={<FullPageLoading />}>
                <AdminRoute />
              </Suspense>
            }
          >
            <Route exact path={ROUTES.ADMIN_HOME} element={<AdminPage />} />
          </Route>

          <Route
            element={
              <Suspense fallback={<FullPageLoading />}>
                <SellerRoute />
              </Suspense>
            }
          >
            <Route
              path={ROUTES.SELLER_HOME}
              element={<SellerPage userDesc={userDesc} />}
            />
          </Route>

          <Route
            element={
              <Suspense fallback={<FullPageLoading />}>
                <AuthenticatedRoute />
              </Suspense>
            }
          >
            <Route
              path={ROUTES.USER_HOME}
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <UserPage userDesc={userDesc} />
                </Suspense>
              }
            />

            <Route
              path={ROUTES.USER_CART}
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <UserCart userDesc={userDesc} />
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
                <NonAuthenticatedRoute />
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
