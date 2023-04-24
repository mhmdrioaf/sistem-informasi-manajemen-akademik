import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { IoMdCart, IoMdPerson } from "react-icons/io";
import UserProfile from "./profile/UserProfile";
import UserCart from "./cart/UserCart";
import Header from "../../components/layouts/authenticated/Header";

function User({ currentUser, userDesc }) {
    const [page, setPage] = useState("profile");
    const [activePage, setActivePage] = useState(0);

    const navigate = useNavigate();

    const handlePageChange = (page, index) => {
        setPage(page);
        setActivePage(index);
    };

    const tabs = [
        {
            value: "profile",
            name: "profil",
            element: <IoMdPerson />
        },
        {
            value: "cart",
            name: "keranjang",
            element: <IoMdCart />
        },
    ]

    const pageList = () => {
        switch (page) {
            case "profile":
                return <UserProfile currentUser={currentUser} userDesc={userDesc} />
            case "cart":
                return <UserCart currentUser={currentUser} userDesc={userDesc} />
            default:
                return navigate("/", "replace");
        }
    }

    return (
        <div>
            <Stack>
                <Header handlePageChange={handlePageChange} activePage={activePage} logo={"User"} tabs={tabs} />
                {pageList()}
            </Stack>
        </div>
    );
}

export default User;
export { default as ProfilePage } from "./profile/UserProfile";
export { default as CartPage } from './cart/UserCart';