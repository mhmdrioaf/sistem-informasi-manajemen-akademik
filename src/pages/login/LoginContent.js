import { Box, Stack } from "@mui/system";
import TitleText from "../../components/texts/TitleText";
import BasicTextField from "../../components/textfields/BasicTextField";
import React from "react";
import color from "../../styles/_color.scss";
import { Link, Typography } from "@mui/material";
import PrimaryButton from "../../components/buttons/PrimaryButton";

function LoginContent() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: color.surface,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* login content container */}
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={6}
      >
        {/* login title */}
        <TitleText
          title="Login"
          subtitle="Masuk dengan menggunakan akun yang telah terdaftar"
        />

        {/* textfield container */}
        <Stack sx={{ width: "100%", height: "auto" }} spacing={2}>
          <BasicTextField type="email" variant="standard" label="Email" />
          <BasicTextField type="password" variant="standard" label="Password" />
          <Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.log("Clicked");
              }}
              underline="none"
              color={color.primary}
            >
              Lupa password?
            </Link>
          </Typography>
        </Stack>

        <PrimaryButton fullWidth disableRipple disableElevation>
          Login
        </PrimaryButton>
      </Stack>
    </Box>
  );
}

export default LoginContent;
