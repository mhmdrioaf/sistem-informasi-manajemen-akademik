import {
  Alert,
  AlertTitle,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCamera, IoMdClose } from "react-icons/io";
import DangerButton from "../../../components/buttons/DangerButton";
import InfoButton from "../../../components/buttons/InfoButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import BasicTextField from "../../../components/textfields/BasicTextField";
import TitleText from "../../../components/texts/TitleText";
import { useAuth } from "../../../contexts/FirebaseContext";
import color from "../../../styles/_color.scss";
import "../User.scss";
import Resizer from "react-image-file-resizer";

function UserProfile() {
  const {
    logout,
    verifyEmail,
    authErrorHandler,
    editUserData,
    uploadImage,
    currentUser,
    userData,
  } = useAuth();
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(
    currentUser.emailVerified
  );
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const [viewPhoto, setViewPhoto] = useState(false);
  const fileInput = useRef();
  const userDataDisplay = [
    {
      name: "Nama",
      value: userData?.name ? userData?.name : false,
      type: "text",
    },
    {
      name: "Email",
      value: currentUser?.email,
      verified: currentUser?.emailVerified,
      type: "email",
    },
    {
      name: "Nomor telepon",
      value: userData?.phone_number ? userData?.phone_number : false,
      type: "number",
    },
    { name: "User ID", value: currentUser.uid, type: "user-id" },
    {
      name: "Alamat Pengiriman",
      value: userData?.addresses?.delivery_address
        ? userData?.addresses?.delivery_address
        : false,
      type: "text",
    },
    {
      name: "Kota",
      value: userData?.addresses?.public_address
        ? userData?.addresses?.public_address
        : false,
      type: "text",
    },
  ];

  const handleOpenViewPhoto = () => setViewPhoto(true);

  const handleCloseViewPhoto = () => setViewPhoto(false);

  const resizeImage = (image) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        image,
        600,
        800,
        "JPEG",
        75,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const onUploadImage = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeImage(file);
      setSelectedFile(image);
      avatarUploadHandler(image);
    } catch (error) {
      setEditStatus({
        message:
          "Gagal memperbaharui foto, hubungi developer untuk memperbaikinya.",
        status: "error",
      });
    }
  };

  const verifyEmailHandler = async (e) => {
    e.preventDefault();
    const verifyEmailStats = await verifyEmail();

    if (verifyEmailStats === true) {
      setVerifyStatus({
        message: "Email verifikasi telah dikirim. Silahkan cek email anda.",
        status: "info",
      });
      setIsEmailVerified(true);
    } else {
      setVerifyStatus({
        message: authErrorHandler(verifyEmailStats),
        status: "error",
      });
      setIsEmailVerified(true);
    }
  };

  const avatarUploadHandler = async (newFile) => {
    const imageRef = `assets/users/${currentUser?.uid}/profile_picture`;
    uploadImage(imageRef, newFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setDisabledButton(false);
        setEditedUser((prev) => ({
          ...prev,
          profile_picture: downloadURL,
        }));
      });
    });
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const editUserHandler = async (e) => {
    e.preventDefault();
    const editUserDataStats = await editUserData(editedUser);
    setDisabledButton(true);

    if (editUserDataStats === true) {
      setEditStatus({
        message: "Profil telah di simpan.",
        status: "success",
      });
      setSnackbarOpen(true);
      setIsEdit(false);
    } else {
      setEditStatus({
        message: editUserDataStats,
        status: "error",
      });
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    setIsEmailVerified(currentUser.emailVerified);
  }, [currentUser]);

  useEffect(() => {
    if (!selectedFile) {
      setAvatarPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(selectedFile);
    setAvatarPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [selectedFile]);

  // TODO: Make user can edit their password
  if (currentUser) {
    return (
      <>
        {!isEmailVerified &&
          userData !== ("admin" || "student" || "teacher") && (
            <Alert
              severity="warning"
              style={{
                width: "100%",
                position: "sticky",
                zIndex: 5,
              }}
            >
              <AlertTitle>Segera lakukan verifikasi email.</AlertTitle>
              <Typography>
                Untuk melakukan verifikasi, silakan klik{" "}
                <b
                  onClick={(e) => verifyEmailHandler(e)}
                  style={{ cursor: "pointer" }}
                >
                  disini
                </b>
              </Typography>
            </Alert>
          )}
        {verifyStatus && (
          <Alert
            severity={verifyStatus?.status}
            sx={{
              width: "100%",
              position: "sticky",
              zIndex: 5,
            }}
          >
            {verifyStatus?.message}
          </Alert>
        )}
        {editStatus && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1000}
            onClose={handleCloseSnackbar}
          >
            <Alert severity={editStatus?.status}>{editStatus?.message}</Alert>
          </Snackbar>
        )}
        {userData?.profile_picture && (
          <Modal open={viewPhoto} onClose={handleCloseViewPhoto}>
            <Box
              sx={{
                width: 400,
                height: "auto",
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "none",
                backgroundColor: color.surface,
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                m: 0,
              }}
            >
              <IconButton
                disableRipple
                size="small"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                  backgroundColor: color.primaryContainer,
                  color: color.onPrimaryContainer,
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: color.primary,
                    color: color.onPrimary,
                  },
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderRadius: 0,
                }}
                onClick={handleCloseViewPhoto}
              >
                <IoMdClose />
              </IconButton>
              <img
                src={userData?.profile_picture}
                width={400}
                height="auto"
                alt="product"
              />
            </Box>
          </Modal>
        )}
        <Box className="user__profile__container">
          <Stack className="user__profile__body" spacing={4}>
            <Stack spacing={2} sx={{ justifyContent: "center" }}>
              <TitleText
                title="Profil Saya"
                subtitle="Kelola informasi profil anda untuk mengontrol, melindungi dan mengamankan akun."
              />
              <Divider />
            </Stack>

            {!isEdit && (
              <>
                <Stack
                  sx={{
                    width: "100%",
                    alignItems: "flex-start",
                    overflow: "hidden",
                  }}
                >
                  <Stack
                    id="user-avatar"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    gap={2}
                    sx={{
                      mb: "4vw",
                    }}
                  >
                    <Avatar
                      src={
                        userData?.profile_picture
                          ? userData?.profile_picture
                          : "/broken-image.jpg"
                      }
                      sx={{
                        width: "128px",
                        height: "128px",
                        border: `1px solid ${color.outlineColor}`,
                        cursor: "pointer",
                      }}
                      onClick={() => handleOpenViewPhoto()}
                    />
                  </Stack>
                  <Stack
                    id="table-container"
                    sx={{
                      overflowX: "auto",
                      width: "100%",
                      alignItems: "center",
                      border: `1px solid ${color.outlineColor}`,
                      borderRadius: "4%",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                        borderSpacing: "32px",
                      }}
                    >
                      <tbody>
                        {userDataDisplay.map((user) => (
                          <tr key={user.name}>
                            <td
                              key={user.name}
                              style={{ verticalAlign: "top", padding: "1rem" }}
                            >
                              {user.name}
                            </td>
                            <td
                              key={user.value}
                              style={{
                                wordWrap: "break-word",
                                padding: "1rem",
                              }}
                            >
                              {user.value === false ? (
                                <Typography color={color.outlineColor}>
                                  Belum di set.
                                </Typography>
                              ) : (
                                user.value
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Stack>
                </Stack>
                <InfoButton fullWidth onClick={() => setIsEdit(true)}>
                  Edit Profile
                </InfoButton>
                <DangerButton fullWidth onClick={() => logout()}>
                  Logout
                </DangerButton>
              </>
            )}

            {isEdit && (
              <>
                <Stack
                  sx={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Stack
                    id="user-avatar"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    gap={2}
                    sx={{
                      mb: "4vw",
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <IconButton
                          size="medium"
                          disableRipple
                          onClick={() => fileInput.current.click()}
                          sx={{
                            backgroundColor: color.primary,
                            color: color.onPrimary,
                          }}
                        >
                          <input
                            ref={fileInput}
                            accept="image/*"
                            multiple={false}
                            type="file"
                            onChange={(event) => onUploadImage(event)}
                            hidden
                          />
                          <IoIosCamera />
                        </IconButton>
                      }
                    >
                      {selectedFile && (
                        <Avatar
                          src={avatarPreview}
                          sx={{
                            width: "128px",
                            height: "128px",
                          }}
                        />
                      )}
                      {!selectedFile && (
                        <Avatar
                          src={
                            userData?.profile_picture
                              ? userData?.profile_picture
                              : "/broken-image.jpg"
                          }
                          sx={{
                            width: "128px",
                            height: "128px",
                          }}
                        />
                      )}
                    </Badge>
                  </Stack>
                  <table className="user__profile__table">
                    <tbody>
                      {userDataDisplay.map((data) => (
                        <tr key={data.name}>
                          <td
                            key={data.name}
                            style={{ verticalAlign: "top", padding: "1rem" }}
                          >
                            <Typography color={color.outline}>
                              {data.name}
                            </Typography>
                          </td>
                          <td
                            key={data.value}
                            style={{ wordWrap: "break-word", padding: "1rem" }}
                          >
                            {data.type !== "email" &&
                              data.type !== "user-id" && (
                                <>
                                  <BasicTextField
                                    fullWidth
                                    type={data.type}
                                    label={data.name}
                                    minRows={
                                      data.name === "Alamat Pengiriman" ? 2 : 1
                                    }
                                    multiline={
                                      data.name === "Alamat Pengiriman"
                                        ? true
                                        : false
                                    }
                                    InputProps={{
                                      startAdornment: (
                                        <>
                                          {data.type === "number" && (
                                            <InputAdornment position="start">
                                              +62
                                            </InputAdornment>
                                          )}
                                        </>
                                      ),
                                    }}
                                    placeholder={
                                      data.value === false &&
                                      data.type !== "number"
                                        ? `Masukkan ${data.name}`
                                        : data.value === false &&
                                          data.type === "number"
                                        ? "8123456789"
                                        : data.type === "number"
                                        ? parseInt(
                                            data.value.toString().substring(2)
                                          ).toString()
                                        : data.value
                                    }
                                    onChange={(e) => {
                                      setDisabledButton(false);
                                      switch (data.name) {
                                        case "Nama":
                                          if (e.target.value === "") {
                                            e.target.value = "";
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              name: userData?.name,
                                            }));
                                          } else {
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              name: e.target.value,
                                            }));
                                          }
                                        case "Nomor telepon":
                                          if (e.target.value === "") {
                                            e.target.value = "";
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              phone_number:
                                                userData?.phone_number,
                                            }));
                                          } else {
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              phone_number: Number(
                                                `+62${parseInt(e.target.value)}`
                                              ),
                                            }));
                                          }
                                        case "Alamat Pengiriman":
                                          if (e.target.value === "") {
                                            e.target.value = "";
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              addresses: {
                                                ...prev?.addresses,
                                                delivery_address:
                                                  userData?.addresses
                                                    ?.delivery_address,
                                              },
                                            }));
                                          } else {
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              addresses: {
                                                ...prev?.addresses,
                                                delivery_address:
                                                  e.target.value,
                                              },
                                            }));
                                          }
                                        case "Kota":
                                          if (e.target.value === "") {
                                            e.target.value = "";
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              addresses: {
                                                ...prev?.addresses,
                                                public_address:
                                                  userData?.addresses
                                                    ?.public_address,
                                              },
                                            }));
                                          } else {
                                            return setEditedUser((prev) => ({
                                              ...prev,
                                              addresses: {
                                                ...prev?.addresses,
                                                public_address: e.target.value,
                                              },
                                            }));
                                          }
                                        default:
                                          return setError("No data found");
                                      }
                                    }}
                                  />
                                  {error && <p>ada error</p>}
                                </>
                              )}
                            {(data.type === "email" ||
                              data.type === "user-id") && <>{data.value}</>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Stack>
                <PrimaryButton
                  fullWidth
                  onClick={(e) => editUserHandler(e)}
                  disabled={disabledButton}
                >
                  Simpan
                </PrimaryButton>
                <DangerButton
                  fullWidth
                  onClick={() => {
                    setIsEdit(false);
                    setDisabledButton(true);
                    setSelectedFile(undefined);
                  }}
                >
                  Batal
                </DangerButton>
              </>
            )}
          </Stack>
        </Box>
      </>
    );
  }

  return <h1>Maintenance...</h1>;
}

export default UserProfile;
