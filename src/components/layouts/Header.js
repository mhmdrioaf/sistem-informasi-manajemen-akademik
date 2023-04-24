import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { logoTutWuri } from "../../img";
import ListButton from "../utils/ListButton";
import * as ROUTES from "../../constants/routes";
import color from "../../styles/_color.scss";
import "./Header.scss";
import {
  BsFacebook,
  BsPerson,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsShop,
} from "react-icons/bs";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

function Header({ currentUser, handlePageChange, activePage, scrollValue }) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const socialLink = {
    facebook: "https://www.facebook.com/mr.r3v",
    instagram: "https://www.instagram.com/mhmdrioaf",
    youtube: "https://www.youtube.com",
    twitter: "https://www.twitter.com/oirioir",
  };

  const tabs = [
    { id: "Beranda", name: "home" },
    { id: "Profil", name: "foundation-profile" },
    { id: "Kontak", name: "foundation-contact" },
    { id: "Jurusan", name: "foundation-major" },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const drawerList = (anchor) => (
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
      <Link id="drawer-profile-link"
        href={currentUser ? ROUTES.USER_HOME : ROUTES.LOGIN}
        color="inherit"
        underline="none"
      >
        <List>
          <ListItem disablePadding>
            <ListButton>
              <ListItemIcon>
                <BsPerson />
              </ListItemIcon>
              <ListItemText primary={currentUser ? "Profile" : "Login"} />
            </ListButton>
          </ListItem>
        </List>
      </Link>

      <Link id="drawer-marketplace-link"
        href={ROUTES.MARKETPLACE}
        color="inherit"
        underline="none">
        <List>
          <ListItem disablePadding>
            <ListButton>
              <ListItemIcon>
                <BsShop />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListButton>
          </ListItem>
        </List>
      </Link>

      <Divider />

      {tabs.map((tab, index) => {
        return (
          <List key={tab.name}>
            <ListItem disablePadding>
              <ListButton
                selected={activePage === index}
                disableRipple
                onClick={() => {
                  handlePageChange(tab.name, index);
                }}
              >
                <ListItemText primary={tab.id} />
              </ListButton>
            </ListItem>
          </List>
        );
      })}
    </Stack>
  );

  return (
    <>
      <Box className="sub-header-container">
        <Stack id="sub-header-container"
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

          <Stack id="sub-header-nav-links"
            color="inherit"
            direction="row"
            spacing={2}
          >
            <Link id="sub-header-profile-link"
              underline="none"
              href={currentUser ? ROUTES.USER_HOME : ROUTES.LOGIN}
            >
              <Stack className="link__container" direction={"row"} spacing={1}>
                <BsPerson />
                <Typography sx={{ fontSize: ".7em" }}>
                  {currentUser ? "Profile" : "Login"}
                </Typography>
              </Stack>
            </Link>

            <Link id="sub-header-marketplace-link"
              color={color.onPrimary}
              underline="none"
              href={ROUTES.MARKETPLACE}
            >
              <Stack className="link__container" direction={"row"} spacing={1}>
                <BsShop />
                <Typography sx={{ fontSize: ".7em" }}>Marketplace</Typography>
              </Stack>
            </Link>
          </Stack>

          <Stack id="sub-header-social-media-links"
            spacing={2}
            direction="row"
          >
            <Link href={socialLink.facebook} target="_blank">
              <BsFacebook />
            </Link>

            <Link href={socialLink.instagram} target="_blank">
              <BsInstagram />
            </Link>

            <Link href={socialLink.youtube} target="_blank">
              <BsYoutube />
            </Link>

            <Link href={socialLink.twitter} target="_blank">
              <BsTwitter />
            </Link>
          </Stack>
        </Stack>
      </Box>

      <Box id="header-container"
        className={
          scrollValue >= 75
            ? "header__main__container sticky"
            : "header__main__container"
        }
      >
        <Stack id="header-logo-container-small-devices"
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
              lg: "none",
            },
          }}
        >
          <img
            src={logoTutWuri}
            alt="logo tut wuri"
            style={{
              minWidth: "4vw",
              maxWidth: "8vw",
              height: "auto",
            }}
          />
          <Stack direction="column" spacing={0}>
            <Typography className="small-devices-title"
              sx={{
                fontSize: ".8em",
                fontWeight: "bold",
              }}
            >
              Yayasan Pendidikan Galeuh Pakuan
            </Typography>
            <Typography
              sx={{
                fontSize: "1em",
                fontWeight: "normal",
              }}
            >
              SMKS Korporasi Garut
            </Typography>
          </Stack>
        </Stack>

        <IconButton id="icon-hamburger"
          onClick={toggleDrawer("bottom", true)}
          size="medium"
          sx={{
            display: {
              sm: "flex",
              xs: "flex",
              md: "none",
              lg: "none",
            },
            color: color.onBackgroundColor,
          }}
        >
          <GiHamburgerMenu />
        </IconButton>

        <Stack id="header-logo-container"
          spacing={0}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "1em",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            SMKs Korporasi Garut
          </Typography>
          <Typography
            sx={{
              fontSize: "1em",
              textTransform: "uppercase",
              fontWeight: "bold",
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
              },
            }}
          >
            Yayasan Pendidikan Galeuh Pakuan
          </Typography>
        </Stack>

        <Stack id="navbar-container"
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
                      handlePageChange(tab.name, index);
                    }}
                  >
                    <ListItemText primary={tab.id} />
                  </ListButton>
                </ListItem>
              </List>
            );
          })}
        </Stack>

        <Drawer
          anchor="bottom"
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {drawerList("bottom")}
        </Drawer>
      </Box>
    </>
  );
}

export default Header;
