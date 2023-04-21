import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layouts/Header";
import { Stack } from "@mui/material";
import Home from "./home/Home";
import { Profile, Contact, Major } from "./foundation";

function IndexPage({ currentUser }) {
  const [page, setPage] = useState("home");
  const [activePage, setActivePage] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);

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
        return <Home />;
      case "foundation-profile":
        return <Profile />;
      case "foundation-contact":
        return <Contact />;
      case "foundation-major":
        return <Major />;
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

export default IndexPage;


export { default as LoginPage } from "./login/Login";
export { default as ResetPasswordPage } from "./reset_password/ResetPassword";
export { default as AdminDashboardPage } from "./admin/dashboard/AdminDashboard";
export { default as AdminStudentPage } from "./admin/student/AdminStudent";
export { default as NoAccessPage } from "./error/NoAccess";
export { default as RegisterPage } from "./register/Register";
export { default as ProfilePage } from "./user/profile/UserProfile";
export { default as CartPage } from "./user/cart/UserCart";
export { default as UserPage } from './user/User';
export { default as MarketplacePage } from './marketplace/Marketplace';
