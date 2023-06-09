import { Stack } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../components/indicators/PrimaryLoading";
import Header from "../components/layouts/Header";
import { useAuth } from "../contexts/FirebaseContext";

const Home = lazy(() => import("./home/Home"));
const FoundationProfilePage = lazy(() =>
  import("./foundation/FoundationProfile")
);
const FoundationContactPage = lazy(() =>
  import("./foundation/FoundationContact")
);
const FoundationMajorPage = lazy(() => import("./foundation/FoundationMajor"));

function Landing() {
  const [page, setPage] = useState("home");
  const [activePage, setActivePage] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handlePageChange = (page, index) => {
    setPage(page);
    setActivePage(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollValue(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pageList = () => {
    switch (page) {
      case "home":
        return (
          <Suspense fallback={<FullPageLoading />}>
            <Home />
          </Suspense>
        );

      case "foundation-profile":
        return (
          <Suspense fallback={<FullPageLoading />}>
            <FoundationProfilePage />
          </Suspense>
        );

      case "foundation-contact":
        return (
          <Suspense fallback={<FullPageLoading />}>
            <FoundationContactPage />
          </Suspense>
        );

      case "foundation-major":
        return (
          <Suspense fallback={<FullPageLoading />}>
            <FoundationMajorPage />
          </Suspense>
        );

      default:
        return navigate("/404");
    }
  };

  return (
    <div>
      <Stack>
        <Header
          currentUser={currentUser}
          handlePageChange={handlePageChange}
          activePage={activePage}
          scrollValue={scrollValue}
        />

        {pageList()}
      </Stack>
    </div>
  );
}

export default Landing;

export { default as AdminIndexPage } from "./admin/Admin";
export { default as AdminDashboardPage } from "./admin/dashboard/AdminDashboard";
export { default as AdminStudentPage } from "./admin/student/AdminStudent";
export { default as NotFoundPage } from "./error/NotFound";
export { default as LoginPage } from "./login/Login";
export { default as MarketplacePage } from "./marketplace/Marketplace";
export { default as ProductDetailPage } from "./marketplace/products/ProductDetail";
export { default as RegisterPage } from "./register/Register";
export { default as ResetPasswordPage } from "./reset_password/ResetPassword";
export { default as UserPage } from "./user/User";
export { default as CartPage } from "./user/cart/UserCart";
export { default as ProfilePage } from "./user/profile/UserProfile";
export { default as SellerPage } from "./user/seller/Seller";
