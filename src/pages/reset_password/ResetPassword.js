import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Link, Stack } from "@mui/material";
import TitleText from "../../components/texts/TitleText";
import BasicTextField from "../../components/textfields/BasicTextField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import color from "../../styles/_color.scss";
import FullPageLoading from "../../components/indicators/PrimaryLoading";

function ResetPassword() {
  const { resetPassword, authErrorHandler } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    await resetPassword(email)
      .then(() => {
        setMessage("Email verifikasi telah di kirim.");
        setError();
        setIsButtonDisabled(false);
      })
      .catch((error) => {
        setError(error);
        setIsButtonDisabled(false);
      });
  };

  const onEnterKeyPressedHandler = (e) => {
    if (e.keyCode === 13) {
      resetPasswordHandler(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading && <FullPageLoading />}

      {!isLoading && (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color.backgroundColor,
            color: color.onBackgroundColor,
          }}
        >
          <Stack
            sx={{
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "1.6rem",
            }}
            spacing={6}
          >
            <TitleText
              title="Password Reset"
              subtitle="Isi dengan menggunakan email yang telah terdaftar"
            />

            {error && (
              <Stack sx={{ width: "100%" }}>
                <Alert severity="error">{authErrorHandler(error?.code)}</Alert>
              </Stack>
            )}

            {message && (
              <Stack sx={{ width: "100%" }}>
                <Alert severity="success">{message}</Alert>
              </Stack>
            )}

            <BasicTextField
              type="email"
              variant="standard"
              label="Email"
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyDown={onEnterKeyPressedHandler}
            />

            <Stack spacing={2} sx={{ width: "100%" }}>
              <PrimaryButton
                fullWidth
                disabled={isButtonDisabled}
                onClick={resetPasswordHandler}
              >
                Kirim
              </PrimaryButton>
              <Link
                component="button"
                variant="body2"
                underline="none"
                color={color.primary}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Kembali ke halaman login.
              </Link>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default ResetPassword;
