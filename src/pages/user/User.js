import { Stack } from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { IoMdCart, IoMdHome, IoMdPerson } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../../components/indicators/PrimaryLoading";
import Header from "../../components/layouts/authenticated/Header";

const UserProfile = lazy(() => import("./profile/UserProfile"));
const UserCart = lazy(() => import("./cart/UserCart"));

function User({ currentUser, userDesc }) {
  const [page, setPage] = useState("profile");
  const [activePage, setActivePage] = useState(1);

  const navigate = useNavigate();

  const handlePageChange = (page, index) => {
    setPage(page);
    setActivePage(index);
  };

  const tabs = [
    {
      value: "home",
      name: "Beranda",
      element: <IoMdHome />,
    },
    {
      value: "profile",
      name: "Profil",
      element: <IoMdPerson />,
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
            <UserProfile currentUser={currentUser} userDesc={userDesc} />
          </Suspense>
        );
      case "cart":
        return (
          <Suspense fallback={<FullPageLoading />}>
            <UserCart currentUser={currentUser} userDesc={userDesc} />
          </Suspense>
        );
      case "home":
        return navigate("/");
      default:
        return navigate("/", "replace");
    }
  };

  return (
    <div>
      <Stack>
        <Header
          handlePageChange={handlePageChange}
          activePage={activePage}
          logo={"User"}
          tabs={tabs}
        />
        {pageList()}
      </Stack>
    </div>
  );
}

export default User;
