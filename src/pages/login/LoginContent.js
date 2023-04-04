import { Box, Stack } from "@mui/system";
import TitleText from "../../components/texts/TitleText";
import BasicTextField from "../../components/textfields/BasicTextField";
import React, { useState, useEffect } from "react";
import color from "../../styles/_color.scss";
import {
  IconButton,
  Link,
  Typography,
  InputAdornment,
  Alert,
} from "@mui/material";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../../components/indicators/PrimaryLoading";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, authErrorHandler } = useAuth();
  const navigate = useNavigate();

  const onLoginClickHandler = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true);

    await login(user?.email, user?.password)
      .then(() => {
        setIsButtonDisabled(false);
        navigate("/");
      })
      .catch((error) => {
        setIsButtonDisabled(false);
        setError(error);
      });
  };

  const onLoginKeyHandler = (e) => {
    if (e.keyCode === 13) {
      onLoginClickHandler(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      {isLoading && <FullPageLoading />}

      {!isLoading && (
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
              padding: "1.6rem",
            }}
            spacing={6}
          >
            {/* login title */}
            <TitleText
              title="Login"
              subtitle="Masuk dengan menggunakan akun yang telah terdaftar"
            />

            {error && (
              <Stack sx={{ width: "100%" }}>
                <Alert severity="error">{authErrorHandler(error?.code)}</Alert>
              </Stack>
            )}

            {/* textfield container */}
            <Stack sx={{ width: "100%", height: "auto" }} spacing={2}>
              <BasicTextField
                type="email"
                variant="standard"
                label="Email"
                onChange={(e) => {
                  setUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
              <BasicTextField
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setUser((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                onKeyDown={onLoginKeyHandler}
              />
              <Typography>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    navigate("/resetPassword");
                  }}
                  underline="none"
                  color={color.primary}
                >
                  Lupa password?
                </Link>
              </Typography>
            </Stack>

            <PrimaryButton
              fullWidth
              disableRipple
              disableElevation
              disabled={isButtonDisabled}
              onClick={onLoginClickHandler}
            >
              Login
            </PrimaryButton>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default LoginContent;
