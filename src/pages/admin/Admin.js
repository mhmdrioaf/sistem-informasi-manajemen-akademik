import { Stack, Typography } from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../../components/indicators/PrimaryLoading";
import Header from "../../components/layouts/authenticated/Header";
import * as ROUTES from "../../constants/routes";
import { IoMdBookmark, IoMdPerson } from "react-icons/io";

const AdminDashboardPage = lazy(() => import("./dashboard/AdminDashboard"));
const AdminStudentPage = lazy(() => import("./student/AdminStudent"));

function Admin() {
  const [page, setPage] = useState(ROUTES.ADMIN_DASHBOARD);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const pagesList = () => {
    switch (page) {
      case ROUTES.ADMIN_DASHBOARD:
        return (
          <Suspense fallback={<FullPageLoading />}>
            <AdminDashboardPage />
          </Suspense>
        );
      case ROUTES.ADMIN_STUDENTS:
        return (
          <Suspense fallback={<FullPageLoading />}>
            <AdminStudentPage />
          </Suspense>
        );
      default:
        return navigate("/404");
    }
  };

  const tabs = [
    {
      name: "Dashboard",
      route: ROUTES.ADMIN_DASHBOARD,
      element: <IoMdPerson />,
    },
    { name: "Students", route: ROUTES.ADMIN_STUDENTS, element: <IoMdPerson /> },
    { name: "Dashboard", route: "/admin/teachers", element: <IoMdBookmark /> },
  ];

  return (
    <Stack>
      <Header
        handlePageChange={handlePageChange}
        tabs={tabs}
        logo={
          <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
            Administrator
          </Typography>
        }
      />
      {pagesList()}
    </Stack>
  );
}

export default Admin;
