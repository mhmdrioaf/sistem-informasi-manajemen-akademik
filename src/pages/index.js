import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layouts/Header";
import { Stack } from "@mui/material";
import Home from "./home/Home";
import { Profile, Contact, Major } from "./foundation";

function IndexPage() {
  const [page, setPage] = useState("home");
  const [activePage, setActivePage] = useState(0);

  const navigate = useNavigate();

  const handlePageChange = (page, index) => {
    setPage((prev) => (prev = page));
    setActivePage(index);
  };

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
    <>
      <Stack>
        <Header handlePageChange={handlePageChange} activePage={activePage} />

        {pageList()}
      </Stack>
    </>
  );
}

export default IndexPage;

export { default as HomePage } from "./home/Home";
export { default as LoginPage } from "./login/Login";
export { default as ResetPasswordPage } from "./reset_password/ResetPassword";
