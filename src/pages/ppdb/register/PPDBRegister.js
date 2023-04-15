import React, { useState, useEffect } from "react";
import { Alert, Box, Stack, Typography, Divider } from "@mui/material";
import { AiOutlineUpload } from "react-icons/ai";
import { useAuth } from "../../../contexts/FirebaseContext";
import BasicTextField from "../../../components/textfields/BasicTextField";
import "../PPDB.scss";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

function PPDBRegister() {
  const [assets, setAssets] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const { fetchData, registerPPDB } = useAuth();

  const createMarkup = (data) => {
    return { __html: data };
  };

  const dataDocuments = [
    { name: "Akte Kelahiran", data: "akteKelahiran" },
    { name: "Kartu Keluarga", data: "kartuKeluarga" },
    { name: "Ijazah", data: "ijazah" },
    { name: "SKHU", data: "skhu" },
    { name: "Foto Formal", data: "foto" },
  ];

  const handleDocumentsUpload = (event, id) => {
    setData((prev) => ({
      ...prev,
      [id]: event.target.files[0],
    }));
  };

  const documentChecker = (property) => {
    return data.hasOwnProperty(property);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setError(false);

    if (
      documentChecker("akteKelahiran") &&
      documentChecker("kartuKeluarga") &&
      documentChecker("skhu") &&
      documentChecker("ijazah") &&
      documentChecker("foto")
    ) {
      return await registerPPDB(data?.email, data?.password, data?.displayName);
    } else {
      console.log("ada yang kurang");
    }

    dataDocuments.forEach((document) => {
      if (!documentChecker(document.data)) {
        setError(`Harap unggah ${document.name}.`);
      }
    });
  };

  useEffect(() => {
    const fetchFirestore = async () => {
      const firestoreData = await fetchData("constants", "global");

      setAssets(firestoreData);
      setIsLoading(false);
    };

    fetchFirestore();
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
            src={assets.logo}
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
              <div dangerouslySetInnerHTML={createMarkup(assets.ppdb_info)} />
            </Alert>

            {/* name input */}
            <BasicTextField
              required
              type="text"
              variant="standard"
              label="Nama Lengkap"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  displayName: e.target.value,
                }))
              }
            />

            {/* address input */}
            <BasicTextField
              required
              type="text"
              variant="standard"
              label="Alamat Lengkap"
              maxRows={4}
              multiline
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  alamat: e.target.value,
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

            {/* documents upload */}
            <Stack spacing={1} sx={{ width: "100%" }}>
              {dataDocuments.map((document, index) => (
                <>
                  <Stack
                    key={`document: ${index}`}
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      {document.name}
                      {"(foto/pdf)"}
                    </Typography>
                    <input
                      key={index}
                      type="file"
                      accept="image/*, application/pdf"
                      id={`input-file${index}`}
                      hidden
                      onChange={(event) =>
                        handleDocumentsUpload(event, document.data)
                      }
                    />
                    <label htmlFor={`input-file${index}`} key={document.data}>
                      <PrimaryButton component="span">
                        <AiOutlineUpload />
                      </PrimaryButton>
                    </label>
                  </Stack>
                  <Divider />
                </>
              ))}
            </Stack>

            <PrimaryButton type="submit" fullWidth>
              Daftar
            </PrimaryButton>
            {error && (
              <Stack spacing={2}>
                <Alert severity="error">{error}</Alert>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
      {isLoading && <h1>Loading</h1>}
    </Box>
  );
}

export default PPDBRegister;
