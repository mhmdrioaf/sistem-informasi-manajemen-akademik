import React from "react";
import { Stack, Typography } from "@mui/material";
import color from "../../styles/_color.scss";

function TitleText({ title, subtitle }) {
  return (
    <Stack spacing={2}>
      <Typography
        sx={{
          fontSize: "2em",
          color: color.onSurface,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "1em",
          color: color.subtitleOnSurface,
        }}
      >
        {subtitle}
      </Typography>
    </Stack>
  );
}

export default TitleText;
