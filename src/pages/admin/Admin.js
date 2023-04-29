import { Stack, Typography } from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../../components/indicators/PrimaryLoading";
import Header from "../../components/layouts/global/Header";
import * as ROUTES from "../../constants/routes";

const AdminDashboardPage = lazy(() => import("./dashboard/AdminDashboard"));
const AdminStudentPage = lazy(() => import("./student/AdminStudent"));

function Admin() {
  const [page, setPage] = useState(ROUTES.ADMIN_DASHBOARD);
  const [activePage, setActivePage] = useState(0);

  const navigate = useNavigate();

  const handlePageChange = (page, index) => {
    setPage((prev) => (prev = page));
    setActivePage(index);
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

  return (
    <Stack>
      <Header
        handlePageChange={handlePageChange}
        activePage={activePage}
        tabs={[
          { name: "Dashboard", route: ROUTES.ADMIN_DASHBOARD },
          { name: "Students", route: ROUTES.ADMIN_STUDENTS },
          { name: "Teachers", route: "/admin/teachers" },
        ]}
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
