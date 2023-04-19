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
      <Link
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

      <Link href="/marketplace" color="inherit" underline="none">
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
      <Box className="header__container">
        {/* dashboard menu container */}
        <Stack
          className="header__menu__container"
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
          {/* dashboard link */}

          <Stack direction={"row"} spacing={2}>
            <Link
              color={color.onPrimary}
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

            <Link color={color.onPrimary} underline="none" href="/marketplace">
              <Stack className="link__container" direction={"row"} spacing={1}>
                <BsShop />
                <Typography sx={{ fontSize: ".7em" }}>Marketplace</Typography>
              </Stack>
            </Link>
          </Stack>

          {/* social media link */}
          <Stack
            spacing={2}
            direction="row"
            sx={{
              color: color.onPrimary,
              a: {
                color: color.onPrimary,
              },
            }}
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

      {/* main header container */}
      <Box
        className={
          scrollValue >= 75
            ? "header__main__container sticky"
            : "header__main__container"
        }
      >
        <Stack
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
              width: "6vw",
              height: "6vw",
            }}
          />
          <Stack direction="column" spacing={0}>
            <Typography
              sx={{
                fontSize: ".8em",
                fontWeight: "bold",
                color: color.onSurface,
              }}
            >
              Yayasan Pendidikan Galeuh Pakuan
            </Typography>
            <Typography
              sx={{
                fontSize: "1em",
                fontWeight: "normal",
                color: color.onSurface,
              }}
            >
              SMKS Korporasi Garut
            </Typography>
          </Stack>
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

        {/* header logo container*/}
        <Stack
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
              color: color.onSurface,
            }}
          >
            SMKs Korporasi Garut
          </Typography>
          <Typography
            sx={{
              fontSize: "1em",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: color.onSurface,
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

        {/* navbar container*/}
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
          {list("bottom")}
        </Drawer>
      </Box>
    </>
  );
}

export default Header;
