import React, { useState } from "react";
import color from "../../styles/_color.scss";
import {
  BsFacebook,
  BsPerson,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsShop,
} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import { RiBook2Line } from "react-icons/ri";

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
import ListButton from "../utils/ListButton";
import "./Header.scss";
import { logoTutWuri } from "../../img";

function Header({ handlePageChange, activePage, scrollValue }) {
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
      <Link href="/dashboard" color="inherit" underline="none">
        <List>
          <ListItem disablePadding>
            <ListButton>
              <ListItemIcon>
                <BsPerson />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
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

      <Link href="/lms" color="inherit" underline="none">
        <List>
          <ListItem disablePadding>
            <ListButton>
              <ListItemIcon>
                <RiBook2Line />
              </ListItemIcon>
              <ListItemText primary="E-Learning" />
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          color: color.onSurface,
        }}
      >
        {/* dashboard menu container */}
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: color.primary,
            padding: ".8rem 8rem",
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
            <Link color={color.onPrimary} underline="none" href="/dashboard">
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  alignItems: "center",
                  color: color.onPrimary,
                  fontSize: "16px",
                }}
              >
                <BsPerson />
                <Typography sx={{ fontSize: ".7em" }}>Dashboard</Typography>
              </Stack>
            </Link>

            <Link color={color.onPrimary} underline="none" href="/marketplace">
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  alignItems: "center",
                  color: color.onPrimary,
                  fontSize: "16px",
                }}
              >
                <BsShop />
                <Typography sx={{ fontSize: ".7em" }}>Marketplace</Typography>
              </Stack>
            </Link>

            <Link color={color.onPrimary} underline="none" href="/lms">
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  alignItems: "center",
                  color: color.onPrimary,
                  fontSize: "16px",
                }}
              >
                <RiBook2Line />
                <Typography sx={{ fontSize: ".7em" }}>E-Learning</Typography>
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
        className={scrollValue >= 75 ? "sticky" : ""}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          color: color.onSurface,
          padding: {
            xs: "1.2rem .4rem",
            sm: "1.2rem .4rem",
            md: ".4rem 4rem",
            lg: ".4rem 8rem",
          },
          display: "flex",
          flexDirection: "row",
          backgroundColor: color.headerBackgroundColor,
          zIndex: "10",
        }}
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

        {/* header logo container large device*/}
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

        {/* navbar container large device*/}
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
