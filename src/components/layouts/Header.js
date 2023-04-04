import React from "react";
import color from "../../styles/_color.scss";
import {
  BsFacebook,
  BsPerson,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsShop,
} from "react-icons/bs";

import { RiBook2Line } from "react-icons/ri";

import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ListButton from "../utils/ListButton";
import "./Header.scss";

function Header({ handlePageChange, activePage, scrollValue }) {
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

            <Link color={color.onPrimary} underline="none" href="/outlet">
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
                <Typography sx={{ fontSize: ".7em" }}>Outlet</Typography>
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
          padding: ".4rem 8rem",
          display: "flex",
          flexDirection: "row",
          backgroundColor: color.headerBackgroundColor,
          zIndex: "10",
        }}
      >
        {/* header logo container */}
        <Stack spacing={0}>
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
            }}
          >
            Yayasan Pendidikan Galeuh Pakuan
          </Typography>
        </Stack>

        {/* navbar container */}
        <Stack spacing={2} direction="row">
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
      </Box>
    </>
  );
}

export default Header;
