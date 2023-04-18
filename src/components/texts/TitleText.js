import React from "react";
import { Stack, Typography } from "@mui/material";
import color from "../../styles/_color.scss";

function TitleText({ title, subtitle }) {
  return (
    <Stack>
      <Typography
        sx={{
          fontSize: "1.4em",
          color: color.onSurface,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: ".8em",
          color: color.subtitleOnSurface,
        }}
      >
        {subtitle}
      </Typography>
    </Stack>
  );
}

export default TitleText;
