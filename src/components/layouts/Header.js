import React, { useState } from "react";
import color from "../../styles/_color.scss";
import {
  BsFacebook,
  BsFillPersonFill,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import ListButton from "../utils/ListButton";

function Header({ handlePageChange, activePage }) {
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
            padding: "1rem 2rem",
          }}
        >
          {/* dashboard link */}
          <Link component="button" color={color.onPrimary} underline="none">
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                alignItems: "center",
                color: color.onPrimary,
                fontSize: "16px",
              }}
            >
              <BsFillPersonFill />
              <Typography sx={{ fontSize: ".7em" }}>Dashboard</Typography>
            </Stack>
          </Link>

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

        {/* main header container */}
        <Stack
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            color: color.onSurface,
            padding: "2rem",
          }}
          direction="row"
        >
          {/* header logo container */}
          <Stack spacing={0}>
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
              }}
            >
              Yayasan Pendidikan Galeuh Pakuan
            </Typography>
          </Stack>

          {/* navbar container */}
          <Stack spacing={2} direction="row">
            {tabs.map((tab, index) => {
              return (
                <List>
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
        </Stack>
      </Box>
    </>
  );
}

export default Header;
