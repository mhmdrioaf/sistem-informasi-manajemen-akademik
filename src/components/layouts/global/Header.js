import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import * as ROUTES from "../../../constants/routes";
import "./GlobalHeader.scss";
import ListButton from "../../utils/ListButton";
import color from "../../../styles/_color.scss";
import { GiHamburgerMenu } from "react-icons/gi";

function Header({ handlePageChange, activePage }) {
  const tabs = [
    { name: "Dashboard", route: ROUTES.ADMIN_DASHBOARD },
    { name: "Students", route: ROUTES.ADMIN_STUDENTS },
    { name: "Lecturer", route: "/admin/lecturer" },
  ];

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Stack
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        padding: ".4rem .8rem",
        maxHeight: "75vh",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {tabs.map((tab, index) => {
        return (
          <List key={tab.name}>
            <ListItem disablePadding>
              <ListButton
                selected={activePage === index}
                disableRipple
                onClick={() => {
                  handlePageChange(tab.route, index);
                }}
              >
                <ListItemText primary={tab.name} />
              </ListButton>
            </ListItem>
          </List>
        );
      })}
    </Stack>
  );

  return (
    <>
      <Stack className="global__header__container" direction="row">
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Administrator
        </Typography>
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
          }}
        >
          {tabs.map((tab, index) => {
            return (
              <List key={tab.name}>
                <ListItem disablePadding>
                  <ListButton
                    selected={activePage === index}
                    disableRipple
                    onClick={() => {
                      handlePageChange(tab.route, index);
                    }}
                  >
                    <ListItemText primary={tab.name} />
                  </ListButton>
                </ListItem>
              </List>
            );
          })}
        </Stack>

        {/* hamburger */}
        <IconButton
          onClick={toggleDrawer("bottom", true)}
          size="medium"
          sx={{
            display: {
              sm: "flex",
              xs: "flex",
              md: "none",
              lg: "none",
            },
            color: color.onSurface,
          }}
        >
          <GiHamburgerMenu />
        </IconButton>

        <Drawer
          anchor="bottom"
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {list("bottom")}
        </Drawer>
      </Stack>
    </>
  );
}

export default Header;
