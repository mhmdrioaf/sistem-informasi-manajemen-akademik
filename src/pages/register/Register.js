import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";
import BasicTextField from "../../components/textfields/BasicTextField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import FullPageLoading from "../../components/indicators/PrimaryLoading";
import color from "../../styles/_color.scss";
import * as ROUTES from "../../constants/routes";
import "./Register.scss";

function Register() {
  const [assets, setAssets] = useState({
    image: "",
    ppdb_info: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { register, authErrorHandler, fetchData } = useAuth();

  const createMarkup = (data) => {
    return { __html: data };
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setButtonLoading(true);
    const registerUser = await register(
      data.email,
      data.password,
      data.name,
      data.addresses,
      data.phone_number
    );

    if (registerUser !== true) {
      setError(registerUser);
      setButtonLoading(false);
    } else {
      setError(null);
      setButtonLoading(false);
      navigate("/", "replace");
    }
  };

  useEffect(() => {
    const getAssets = async () => {
      const ref = await fetchData("constants", "global");

      setAssets((prev) => ({
        ...prev,
        image: ref?.IMAGE,
        register_info: ref?.REGISTER_INFO,
      }));

      setIsLoading(false);
    };

    getAssets();
  }, [fetchData]);

  return (
    <Box className="register__container">
      {!isLoading && (
        <Stack
          direction="column"
          spacing={4}
          sx={{
            width: {
              xs: "100%",
              sm: "480px",
              md: "480px",
              lg: "480px",
            },
          }}
          className="register__box__container"
        >
          <img
            src={assets.image}
            style={{ width: "164px", height: "164px" }}
            alt="tutwurilogo"
          />

          <Stack
            className="register__textfield__container"
            spacing={2}
            component="form"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <Alert severity="info" icon={false}>
              <div
                dangerouslySetInnerHTML={createMarkup(assets.register_info)}
              />
            </Alert>

            {error && (
              <Alert severity="error" icon={false}>
                {authErrorHandler(error)}
              </Alert>
            )}

            {/* name input */}
            <BasicTextField
              required
              type="text"
              variant="standard"
              label="Nama Lengkap"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            {/* phone number input */}
            <BasicTextField
              required
              type="number"
              variant="standard"
              label="Nomor Telepon"
              placeholder="812345678"
              className="register__inputNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography>+62</Typography>
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  phone_number: Number(`+62${parseInt(e.target.value)}`),
                }))
              }
            />

            {/* address input */}
            <BasicTextField
              required
              type="text"
              variant="standard"
              label="Alamat"
              maxRows={4}
              multiline
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  addresses: {
                    delivery_address: "",
                    public_address: e.target.value,
                  },
                }))
              }
            />

            {/* email input */}
            <BasicTextField
              required
              type="email"
              variant="standard"
              label="Email"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            {/* password input */}
            <BasicTextField
              required
              type="password"
              variant="standard"
              label="Password"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />

            <PrimaryButton type="submit" fullWidth disabled={buttonLoading}>
              Daftar
            </PrimaryButton>
            <Typography
              sx={{ alignSelf: "center" }}
              color={color.outline}
              fontSize={".8em"}
            >
              Sudah punya akun?{" "}
              <strong>
                <Link
                  color={color.primary}
                  underline="none"
                  href={ROUTES.LOGIN}
                >
                  Klik disini.
                </Link>
              </strong>
            </Typography>
          </Stack>
        </Stack>
      )}
      {isLoading && <FullPageLoading />}
    </Box>
  );
}

export default Register;
