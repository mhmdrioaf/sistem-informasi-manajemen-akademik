import React, { useState } from 'react';
import {
    Stack,
    Typography,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    SwipeableDrawer,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu, GiShop } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { HiHome } from "react-icons/hi";
import { AiFillShopping } from "react-icons/ai";
import OutlinedButton from '../../buttons/OutlinedButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import BasicTextField from '../../textfields/BasicTextField';
import * as ROUTES from '../../../constants/routes';
import color from '../../../styles/_color.scss';
import './MarketplaceHeader.scss';

function MarketplaceHeader({ currentUser, userDesc }) {

    const [state, setState] = useState(false);
    const navigate = useNavigate();
    const navigationTabs = [
        { name: "Home", value: <HiHome />, link: ROUTES.LANDING },
        { name: "Profile", value: <BsFillPersonFill />, link: ROUTES.USER_HOME },
        { name: "Marketplace", value: <AiFillShopping />, link: ROUTES.MARKETPLACE }
    ]
    const categoriesList = [
        { name: "Olerikultura", value: "olerikultura" },
        { name: "Frutikultura", value: "frutikultura" },
        { name: "Florikultura", value: "florikultura" },
        { name: "Biofarmaka", value: "biofarmaka" },
        { name: "Makanan", value: "makanan" },
        { name: "Minuman", value: "minuman" },
    ]
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    // drawer menu list
    const list = () => (
        <Stack
            alignItems="center"
            justifyContent="space-around"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            direction="column"
            className="drawer"
            gap={8}
        >
            <List>
                {/* nav tabs */}
                {navigationTabs.map((tab) => (
                    <ListItem key={tab.name} sx={{ width: "100%" }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                            sx={{
                                backgroundColor: tab.name === "Marketplace" ? color.primaryContainer : color.surfaceVariant,
                                color: tab.name === "Marketplace" ? color.onPrimaryContainer : color.onSurfaceVariant,
                                width: "100%",
                                padding: ".8rem 2.4rem",
                                borderRadius: ".8vw",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: color.primary,
                                    color: color.onPrimary,
                                }
                            }}
                            onClick={() => navigate(tab.link)}
                        >
                            {tab.value}
                            <ListItemText primary={tab.name} />
                        </Stack>
                    </ListItem>
                ))}
                {/* if the user is seller, show seller dashboard menu */}
                {userDesc?.role === ("admin" || "student" || "teacher") && (
                    <ListItem sx={{ width: "100%" }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                            sx={{
                                backgroundColor: color.surfaceVariant,
                                color: color.onSurfaceVariant,
                                width: "100%",
                                padding: ".8rem 2.4rem",
                                borderRadius: ".8vw",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: color.primary,
                                    color: color.onPrimary,
                                }
                            }}
                            onClick={() => navigate(ROUTES.SELLER_DASHBOARD)}
                        >
                            <GiShop />
                            <ListItemText primary="Seller Dashboard" />
                        </Stack>
                    </ListItem>
                )}
                <Divider />
                <ListItem sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Typography fontSize="1.6em" fontWeight="bold">Kategori</Typography>
                </ListItem>
                {/* categories tab */}
                {categoriesList.map((category) => (
                    <ListItem>
                        <Stack
                            direction="column"
                            gap={2}
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                textAlign: "center",
                                backgroundColor: color.surfaceVariant,
                                color: color.onSurfaceVariant,
                                padding: ".8rem .4rem",
                                width: "100%",
                                borderRadius: ".8vw",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: color.primary,
                                    color: color.onPrimary
                                }
                            }}
                            onClick={() => navigate(`${ROUTES.MARKETPLACE_CATEGORY}${category.value}`)}
                        >
                            {category.name}
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Stack>
    )

    return (
        <>
            {/* header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={8} className="marketplace__header__container">
                {/* logo container */}
                <Stack direction="row" alignItems="center" justifyContent="start" gap={2} flexGrow={1}>
                    {/* hamburger */}
                    <IconButton disableRipple size="medium" className="icon" onClick={toggleDrawer(true)}>
                        <GiHamburgerMenu />
                    </IconButton>
                    {/* logo */}
                    <Stack direction="column" alignItems="start" justifyContent="center">
                        <Typography sx={{
                            display: {
                                xs: "none",
                                sm: "none",
                                md: "inline-block",
                                lg: "inline-block",
                            }
                        }}>SMK Korporasi Garut</Typography>
                        <Typography fontWeight="bold">Marketplace</Typography>
                    </Stack>
                </Stack>
                {/* search-bar container */}
                <Stack alignItems="center" justifyContent="center" flexGrow={3} sx={{
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "none",
                        lg: "flex",
                    }
                }}>
                    <BasicTextField
                        fullWidth
                        hiddenLabel
                        placeholder="Cari apa saja..."
                        variant="outlined"
                        onChange={(e) => console.log(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch />
                                </InputAdornment>
                            )
                        }}
                    />
                </Stack>
                {/* nav container */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap={{
                        xs: 0,
                        sm: 0,
                        md: 2,
                        lg: 2,
                    }}
                    flexGrow={1}
                >
                    {/* TODO: show search-bar text input on icon click */}
                    { /* search icon */}
                    <IconButton disableRipple size="medium" onClick={() => console.log("cart")} className="icon" sx={{
                        display: {
                            xs: "flex",
                            sm: "flex",
                            md: "flex",
                            lg: "none"
                        }
                    }}>
                        <FaSearch />
                    </IconButton>
                    {/* cart icon */}
                    <IconButton disableRipple size="medium" onClick={() => console.log("cart")} className="icon">
                        <FaShoppingCart />
                    </IconButton>
                    <div className="divider">d</div>
                    {/* if the user isn't signed in */}
                    {!currentUser && (
                        <Stack direction="row" gap={2} sx={{
                            display: {
                                xs: "none",
                                sm: "none",
                                md: "flex",
                                lg: "flex"
                            }
                        }}>
                            <PrimaryButton variant="standard" onClick={() => navigate(ROUTES.LOGIN)}>Login</PrimaryButton>
                            <OutlinedButton variant="standard" onClick={() => navigate(ROUTES.REGISTER)}>Daftar</OutlinedButton>
                        </Stack>
                    )}
                    {/* if the user is signed in */}
                    {currentUser && (
                        <Stack direction="row" alignItems="center" justifyContent="center">
                            {/* notifications icon */}
                            <IconButton
                                disableRipple
                                onClick={() => "profile"}
                                className="icon"
                                size="medium"
                            >
                                <IoMdNotifications />
                            </IconButton>
                        </Stack>
                    )}
                </Stack>
            </Stack>
            {/* drawer */}
            <SwipeableDrawer
                anchor="left"
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </>
    )
}

export default MarketplaceHeader;