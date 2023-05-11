import { Stack } from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { IoMdCart, IoMdHome } from "react-icons/io";
import { Navigate } from "react-router-dom";
import FullPageLoading from "../../components/indicators/PrimaryLoading";
import Header from "../../components/layouts/authenticated/Header";
import * as ROUTES from "../../constants/routes";

const UserProfile = lazy(() => import("./profile/UserProfile"));

function User() {
  const [page, setPage] = useState("profile");

  const handlePageChange = (page) => {
    setPage(page);
  };

  const tabs = [
    {
      value: "home",
      name: "Beranda",
      element: <IoMdHome />,
    },
    {
      value: "cart",
      name: "Keranjang",
      element: <IoMdCart />,
    },
  ];

  const pageList = () => {
    switch (page) {
      case "profile":
        return (
          <Suspense fallback={<FullPageLoading />}>
            <UserProfile />
          </Suspense>
        );
      case "cart":
        return (
          <Suspense fallback={<FullPageLoading />}>
            <Navigate to={ROUTES.USER_CART} />
          </Suspense>
        );
      case "home":
        return <Navigate to={ROUTES.LANDING} replace />;
      default:
        return <Navigate to={ROUTES.LANDING} replace />;
    }
  };

  return (
    <div>
      <Stack>
        <Header handlePageChange={handlePageChange} logo={"User"} tabs={tabs} />
        {pageList()}
      </Stack>
    </div>
  );
}

export default User;
