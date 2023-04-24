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
    Popover,
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
    const [anchorElement, setAnchorElement] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const searchInputOpen = Boolean(anchorElement);
    const searchInputId = searchInputOpen ? "simple-popover" : undefined;
    const searchSubmitHandler = (query) => {
        if (query !== "") {
            return navigate(`?search=${query}`)
        }
    }
    const navigationTabs = [
        { name: "Home", value: <HiHome />, link: ROUTES.LANDING, id: "nav-tab-home" },
        { name: "Profile", value: <BsFillPersonFill />, link: ROUTES.USER_HOME, id: "nav-tab-profile" },
        { name: "Marketplace", value: <AiFillShopping />, link: ROUTES.MARKETPLACE, id: "nav-tab-marketplace" }
    ]
    const categoriesList = [
        { name: "Olerikultura", value: "olerikultura", id: "olerikultura" },
        { name: "Frutikultura", value: "frutikultura", id: "frutikultura" },
        { name: "Florikultura", value: "florikultura", id: "florikultura" },
        { name: "Biofarmaka", value: "biofarmaka", id: "biofarmaka" },
        { name: "Makanan", value: "makanan", id: "makanan" },
        { name: "Minuman", value: "minuman", id: "minuman" },
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
    const handleSearchInputClick = (event) => {
        setAnchorElement(event.currentTarget);
    }
    const drawerList = () => (
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
                {navigationTabs.map((tab) => (
                    <ListItem key={tab.id} sx={{ width: "100%" }}>
                        <Stack
                            key={tab.id}
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
                            <ListItemText key={tab.id} primary={tab.name} />
                        </Stack>
                    </ListItem>
                ))}
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
                {categoriesList.map((category) => (
                    <ListItem key={category.id}>
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
            <Stack id="header-container"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={8}
                className="marketplace__header__container"
            >
                <Stack id="logo-container"
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                    gap={2}
                    flexGrow={1}
                >
                    <IconButton id="icon-hamburger"
                        disableRipple
                        size="medium"
                        className="icon"
                        onClick={toggleDrawer(true)}
                    >
                        <GiHamburgerMenu />
                    </IconButton>
                    <Stack id="header-logo"
                        direction="column"
                        alignItems="start"
                        justifyContent="center"
                    >
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
                <Stack id="search-bar-container"
                    alignItems="center"
                    justifyContent="center"
                    flexGrow={3}
                    sx={{
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "flex",
                        }
                    }}
                >
                    <BasicTextField
                        fullWidth
                        hiddenLabel
                        placeholder="Cari apa saja..."
                        variant="outlined"
                        onChange={(event) => setSearchQuery(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PrimaryButton onClick={() => searchSubmitHandler(searchQuery)}>Cari</PrimaryButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Stack>
                <Stack id="nav-container"
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
                    <Popover
                        id={searchInputId}
                        open={searchInputOpen}
                        anchorEl={anchorElement}
                        onClose={() => setAnchorElement(null)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        <BasicTextField
                            hiddenLabel
                            placeholder="Cari apa saja..."
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => searchSubmitHandler(searchQuery)}>
                                            <FaSearch />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </Popover>
                    <IconButton id="search-icon"
                        disableRipple
                        size="medium"
                        onClick={(event) => handleSearchInputClick(event)}
                        className="icon"
                        sx={{
                            display: {
                                xs: "flex",
                                sm: "flex",
                                md: "flex",
                                lg: "none"
                            }
                        }}
                    >
                        <FaSearch />
                    </IconButton>
                    <IconButton id="cart-icon"
                        disableRipple
                        size="medium"
                        onClick={() => console.log("cart")}
                        className="icon"
                    >
                        <FaShoppingCart />
                    </IconButton>
                    <div className="divider">d</div>
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
                    {currentUser && (
                        <Stack direction="row" alignItems="center" justifyContent="center">
                            <IconButton id="icon-notifications"
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
            <SwipeableDrawer
                anchor="left"
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {drawerList()}
            </SwipeableDrawer>
        </>
    )
}

export default MarketplaceHeader;