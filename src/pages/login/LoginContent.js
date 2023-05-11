import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";
import BasicTextField from "../../components/textfields/BasicTextField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import FullPageLoading from "../../components/indicators/PrimaryLoading";
import * as ROUTES from "../../constants/routes";
import { IoMdHome, IoMdArrowBack } from "react-icons/io";
import color from "../../styles/_color.scss";
import {
  Box,
  Stack,
  IconButton,
  Link,
  Typography,
  InputAdornment,
  Alert,
} from "@mui/material";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState();
  const [loginConstants, setLoginConstants] = useState([]);
  const [assets, setAssets] = useState({
    image: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, authErrorHandler, fetchData } = useAuth();
  const navigate = useNavigate();

  const onLoginClickHandler = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true);

    await login(user?.email, user?.password)
      .then(() => {
        setIsButtonDisabled(false);
        navigate(-1);
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const createMarkup = () => {
    return { __html: loginConstants?.LOGIN_INFO };
  };

  useEffect(() => {
    const getConstants = async () => {
      const loginConstants = await fetchData("constants", "login");
      const assets = await fetchData("constants", "global");

      setAssets((prev) => ({
        ...prev,
        image: assets.IMAGE,
      }));
      setLoginConstants(loginConstants);
      setIsLoading(false);
    };

    getConstants();
  }, [fetchData]);

  return (
    <>
      {isLoading && <FullPageLoading />}

      {!isLoading && (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: color.surfaceVariant,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4rem 0",
          }}
        >
          {/* login content container */}
          <Stack
            sx={{
              width: {
                xs: "100%",
                sm: "480px",
                md: "480px",
                lg: "480px",
              },
              justifyContent: "center",
              alignItems: "center",
              padding: "1.6rem",
              backgroundColor: color.surface,
              borderRadius: ".4vw",
              position: "relative",
            }}
            spacing={4}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <IconButton
                onClick={() => navigate(ROUTES.LANDING)}
                disableRipple
                size="small"
                color={color.onSurface}
                sx={{
                  borderRadius: 0,
                  backgroundColor: color.tertiaryContainer,
                  color: color.onTertiaryContainer,
                  "&:hover": {
                    backgroundColor: color.tertiary,
                    color: color.onTertiary,
                  },
                }}
              >
                <>
                  <IoMdArrowBack /> <IoMdHome />
                </>
              </IconButton>
            </div>
            {/* login title */}
            <img
              src={assets.image}
              style={{
                width: "164px",
                height: "164px",
              }}
              alt="logo tut wuri"
            />
            {/* textfield container */}
            <Stack sx={{ width: "100%", height: "auto" }} spacing={2}>
              <Alert icon={false} severity="info" sx={{ mb: 2 }}>
                <Stack direction="row">
                  <Typography
                    sx={{
                      whiteSpace: "pre-line",
                      a: {
                        color: "inherit",
                      },
                    }}
                    dangerouslySetInnerHTML={createMarkup()}
                  />
                </Stack>
              </Alert>
              {error && (
                <Stack sx={{ width: "100%" }}>
                  <Alert severity="error">
                    {authErrorHandler(error?.code)}
                  </Alert>
                </Stack>
              )}
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
            <Typography
              sx={{ alignSelf: "center" }}
              color={color.outline}
              fontSize={".8em"}
            >
              Belum punya akun?{" "}
              <strong>
                <Link
                  color={color.primary}
                  underline="none"
                  href={ROUTES.REGISTER}
                >
                  Klik disini.
                </Link>
              </strong>
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default LoginContent;
