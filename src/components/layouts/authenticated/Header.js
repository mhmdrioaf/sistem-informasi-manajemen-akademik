import { Drawer, IconButton, List, ListItem, ListItemText, Stack } from "@mui/material";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import ListButton from "../../utils/ListButton";
import "./Authenticated.scss";

function Header({ handlePageChange, activePage, tabs, logo }) {
    const [state, setState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open)
    }

    const menuList = () => (
        <Stack
            sx={{
                width: "auto",
                padding: ".4rem .8rem",
                maxHeight: "75vh"
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {tabs.map((tab, index) => {
                return (
                    <List key={tab.name}>
                        <ListItem disablePadding>
                            <ListButton
                                selected={activePage === index}
                                disableRipple
                                onClick={() => {
                                    handlePageChange(tab.value, index);
                                }}
                            >
                                <ListItemText primary={tab.name} />
                            </ListButton>
                        </ListItem>
                    </List>
                )
            })}
        </Stack>
    )

    return (
        <>
            <Stack className="authenticated__header__container" direction="row">
                {logo}
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "flex",
                            lg: "flex",
                        },
                        justifyContent: "flex-start"
                    }}
                >
                    {tabs.map((tab, index) => {
                        return (
                            <List key={tab.name}>
                                <ListItem disablePadding>
                                    <IconButton
                                        color="inherit"
                                        onClick={() => {
                                            handlePageChange(tab.value, index)
                                        }}
                                        size="medium"
                                    >
                                        {tab.element}
                                    </IconButton>
                                </ListItem>
                            </List>
                        )
                    })}
                </Stack>

                {/* hamburger */}
                <IconButton
                    onClick={toggleDrawer(true)}
                    size="medium"
                    sx={{
                        display: {
                            sm: "flex",
                            xs: "flex",
                            md: "none",
                            lg: "none",
                        },
                        color: "inherit",
                    }}
                >
                    <GiHamburgerMenu />
                </IconButton>

                <Drawer
                    anchor="bottom"
                    open={state}
                    onClose={toggleDrawer(false)}
                >
                    {menuList()}
                </Drawer>
            </Stack>
        </>
    )
}

export default Header;