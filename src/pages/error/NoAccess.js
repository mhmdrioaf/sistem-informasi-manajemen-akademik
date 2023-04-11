import React from "react";
import { Alert, Link, Stack, Typography } from "@mui/material";

function NoAccess() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Alert icon={false} severity="error">
        <Typography>
          You have no access to this page,{" "}
          <strong>
            <Link underline="none" color="inherit" href="/">
              Click here to go back home!
            </Link>
          </strong>
        </Typography>
      </Alert>
    </Stack>
  );
}

export default NoAccess;
