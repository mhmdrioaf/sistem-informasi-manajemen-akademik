import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { AdminDashboardPage, AdminStudentPage } from "..";
import Header from "../../components/layouts/global/Header";
import * as ROUTES from "../../constants/routes";

function AdminIndexPage() {
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
        return <AdminDashboardPage />;
      case ROUTES.ADMIN_STUDENTS:
        return <AdminStudentPage />;
      default:
        return navigate("/404");
    }
  };

  return (
    <Stack>
      <Header handlePageChange={handlePageChange} activePage={activePage} />
      {pagesList()}
    </Stack>
  );
}

export default AdminIndexPage;
