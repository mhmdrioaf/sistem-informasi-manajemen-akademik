import React from "react";
import { Stack } from "@mui/material";

function NotFound() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "8px",
        }}
      >
        <p style={{ color: "rgba(0, 0, 0, 0.7)" }}>Oops...</p>
        <p>404 Not Found</p>
      </div>
    </Stack>
  );
}

export default NotFound;
