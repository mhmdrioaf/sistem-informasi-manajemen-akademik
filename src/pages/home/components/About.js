import React from "react";
import color from "../../../styles/_color.scss";
import { Stack, Typography } from "@mui/material";
import "./Speech.scss";

function About() {
  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "6.4rem",
        borderBottom: `.1vw solid ${color.subtitleOnSurface}`,
      }}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          sx={{
            fontSize: "1.6em",
            color: color.onSurface,
            whiteSpace: "pre-line",
            fontWeight: "bold",
          }}
        >
          {"Tentang \n SMKS Korporasi Garut"}
        </Typography>
        <div className="divider" />
      </Stack>
    </Stack>
  );
}

export default About;
