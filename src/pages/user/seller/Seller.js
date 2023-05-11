import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiShoppingBag2Fill,
  RiArchiveFill,
  RiAddBoxFill,
} from "react-icons/ri";
import { Stack } from "@mui/material";
import { ProductList, ProductAdd, ProductDraft } from "./product";
import Header from "../../../components/layouts/authenticated/Header";
import { useAuth } from "../../../contexts/FirebaseContext";

function Seller() {
  const { userData } = useAuth();
  const [page, setPage] = useState("product-list");
  const [activePage, setActivePage] = useState(0);
  const navigate = useNavigate();
  const tabs = [
    {
      name: "Product List",
      value: "product-list",
      element: <RiShoppingBag2Fill />,
    },
    {
      name: "Product Draft",
      value: "product-draft",
      element: <RiArchiveFill />,
    },
    {
      name: "Add Product",
      value: "product-add",
      element: <RiAddBoxFill />,
    },
  ];
  const pagesList = () => {
    switch (page) {
      case "product-list":
        return <ProductList />;
      case "product-add":
        return <ProductAdd />;
      case "product-draft":
        return <ProductDraft />;
      default:
        navigate("/404");
    }
  };

  const handlePageChange = (newPage, newActivePage) => {
    setPage(newPage);
    setActivePage(newActivePage);
  };

  if (userData?.role === ("admin" || "teacher" || "student")) {
    return (
      <Stack>
        <Header
          handlePageChange={handlePageChange}
          activePage={activePage}
          tabs={tabs}
          logo={"Seller"}
        />
        {pagesList()}
      </Stack>
    );
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <p>Oops...</p>
      <b>You have no access to this page.</b>
    </Stack>
  );
}

export default Seller;
