import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../contexts/FirebaseContext";
import { Divider, Stack, Box, Typography, Alert, InputAdornment, Avatar, Badge, IconButton } from "@mui/material";
import BasicTextField from "../../../components/textfields/BasicTextField";
import { IoIosCamera } from 'react-icons/io';
import color from "../../../styles/_color.scss";
import DangerButton from "../../../components/buttons/DangerButton";
import InfoButton from "../../../components/buttons/InfoButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import TitleText from "../../../components/texts/TitleText";
import "../User.scss";
import { getDownloadURL } from "firebase/storage";

function UserProfile({ currentUser, userDesc }) {
  const { logout, verifyEmail, authErrorHandler, editUserData, uploadImage } = useAuth();
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(currentUser.emailVerified);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState();
  const [editedUser, setEditedUser] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const fileInput = useRef();
  const userData = [
    {
      name: "Nama",
      value: currentUser.displayName
        ? currentUser.displayName
        : false,
      type: "text"
    },
    { name: "Email", value: currentUser.email, verified: currentUser.emailVerified, type: "email" },
    { name: "Nomor telepon", value: userDesc.phone_number ? userDesc.phone_number : false, type: "number" },
    { name: "User ID", value: currentUser.uid, type: "user-id" },
    { name: "Alamat Pengiriman", value: userDesc.addresses.delivery_address ? userDesc.addresses.delivery_address : false, type: "text" },
    { name: "Kota", value: userDesc.addresses.public_address ? userDesc.addresses.public_address : false, type: "text" }
  ];

  const verifyEmailHandler = async (e) => {
    e.preventDefault();
    const verifyEmailStats = await verifyEmail();

    if (verifyEmailStats === true) {
      setVerifyStatus({
        message: "Email verifikasi telah dikirim.",
        status: "success"
      })
    } else {
      setVerifyStatus({
        message: authErrorHandler(verifyEmailStats),
        status: "error"
      });
    }
  }

  const avatarUploadHandler = async (newFile) => {
    const imageRef = `assets/users/${currentUser?.uid}/profile_picture`
    uploadImage(imageRef, newFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setDisabledButton(false);
        setEditedUser((prev) => ({
          ...prev,
          profile_picture: downloadURL
        }))
      })
    })
  }

  const editUserHandler = async (e) => {
    e.preventDefault();
    const editUserDataStats = await editUserData(editedUser)
    setDisabledButton(true)

    if (editUserDataStats === true) {
      setEditStatus({
        message: "Profil telah di edit, sistem akan memuat ulang...",
        status: "success",
      })
      setButtonLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    } else {
      setEditStatus({
        message: editUserDataStats,
        status: "error",
      })
    }
  }

  useEffect(() => {
    setIsEmailVerified(currentUser.emailVerified);
  }, [currentUser])

  useEffect(() => {
    if (!selectedFile) {
      setAvatarPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(selectedFile)
    setAvatarPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [selectedFile])

  // TODO: Make user can edit their password
  if (currentUser) {
    return (
      <>
        <Box className="user__profile__container">
          <Stack className="user__profile__body" spacing={4}>
            <Stack spacing={2} sx={{ justifyContent: "center" }}>
              <TitleText
                title="Profil Saya"
                subtitle="Kelola informasi profil anda untuk mengontrol, melindungi dan mengamankan akun."
              />
              <Divider />
              {editStatus && (
                <Alert severity={editStatus?.status}>
                  {editStatus?.message}
                </Alert>
              )}

              {verifyStatus && (
                <Alert severity={verifyStatus?.status}>
                  {verifyStatus?.message}
                </Alert>
              )}
            </Stack>

            {!isEdit && (
              <>
                <Stack
                  sx={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Stack id="user-avatar"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    gap={2}
                    sx={{
                      mb: "4vw"
                    }}
                  >
                    <Avatar
                      src={userDesc?.profile_picture ? userDesc?.profile_picture : "/broken-image.jpg"}
                      sx={{
                        width: "128px",
                        height: "128px"
                      }}
                    />
                  </Stack>
                  <table className="user__profile__table" style={{ tableLayout: "fixed" }}>
                    <tbody>
                      {userData.map((data) => (
                        <tr key={data.name}>
                          <td key={data.name}>
                            <Typography color={color.outline}>
                              {data.name}
                            </Typography>
                          </td>
                          <td key={data.value} style={{ wordWrap: "break-word" }}>
                            <Stack direction="row" spacing={4} sx={{
                              alignItems: "center"
                            }}>
                              <div>{data.value === false ? <Typography sx={{ color: "rgba(0,0,0,0.5)" }}>Belum di set.</Typography> : data.value}</div>
                              <div>
                                {userDesc?.role === "guest" && !isEmailVerified && data.hasOwnProperty("verified") && (
                                  <PrimaryButton onClick={(e) => verifyEmailHandler(e)}>Verifikasi Email</PrimaryButton>
                                )}
                              </div>
                            </Stack>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                  <Stack id="user-avatar"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    gap={2}
                    sx={{
                      mb: "4vw"
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
                            color: color.onPrimary
                          }}
                        >
                          <input
                            ref={fileInput}
                            accept="image/*"
                            multiple={false}
                            type="file"
                            onChange={(event) => {
                              setSelectedFile(event.target.files[0])
                              avatarUploadHandler(event.target.files[0])
                            }}
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
                            height: "128px"
                          }}
                        />
                      )}
                      {!selectedFile && (
                        <Avatar
                          src={userDesc?.profile_picture ? userDesc?.profile_picture : "/broken-image.jpg"}
                          sx={{
                            width: "128px",
                            height: "128px"
                          }}
                        />
                      )}
                    </Badge>
                  </Stack>
                  <table className="user__profile__table">
                    <tbody>
                      {userData.map((data) => (
                        <tr key={data.name}>
                          <td key={data.name}>
                            <Typography color={color.outline}>
                              {data.name}
                            </Typography>
                          </td>
                          <td key={data.value}>
                            {data.type !== "email" && data.type !== "user-id" && (
                              <>
                                <BasicTextField
                                  fullWidth
                                  type={data.type}
                                  label={data.name}
                                  InputProps={{
                                    startAdornment: (
                                      <>
                                        {data.type === "number" && (
                                          <InputAdornment position="start">
                                            +62
                                          </InputAdornment>
                                        )}
                                      </>
                                    )
                                  }}
                                  placeholder={
                                    data.value === false && data.type !== "number"
                                      ? `Masukkan ${data.name}`
                                      : (data.value === false && data.type === "number")
                                        ? "8123456789"
                                        : (data.type === "number")
                                          ? parseInt(data.value.toString().substring(2))
                                          : data.value
                                  }
                                  onChange={(e) => {
                                    setDisabledButton(false);
                                    switch (data.name) {
                                      case "Nama":
                                        if (e.target.value === "") {
                                          e.target.value = ""
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            displayName: currentUser?.displayName
                                          }))
                                        } else {
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            displayName: e.target.value,
                                          }))
                                        }
                                      case "Nomor telepon":
                                        if (e.target.value === "") {
                                          e.target.value = ""
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            phone_number: userDesc?.phone_number
                                          }))
                                        } else {
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            phone_number: Number(`+62${parseInt(e.target.value)}`),
                                          }))
                                        }
                                      case "Alamat Pengiriman":
                                        if (e.target.value === "") {
                                          e.target.value = ""
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            addresses: {
                                              ...prev?.addresses,
                                              delivery_address: userDesc?.addresses?.delivery_address
                                            }
                                          }))
                                        } else {
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            addresses: {
                                              ...prev?.addresses,
                                              delivery_address: e.target.value
                                            }
                                          }))
                                        }
                                      case "Kota":
                                        if (e.target.value === "") {
                                          e.target.value = ""
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            addresses: {
                                              ...prev?.addresses,
                                              public_address: userDesc?.addresses?.public_address
                                            }
                                          }))
                                        } else {
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            addresses: {
                                              ...prev?.addresses,
                                              public_address: e.target.value
                                            }
                                          }))
                                        }
                                      default:
                                        return setError("No data found");
                                    }
                                  }}
                                />
                                {error && <p>ada error</p>}
                              </>
                            )}
                            {(data.type === "email" || data.type === "user-id") && (
                              <>
                                {data.value}
                              </>
                            )}
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Stack>
                <PrimaryButton fullWidth onClick={(e) => editUserHandler(e)} disabled={disabledButton}>
                  Simpan
                </PrimaryButton>
                <DangerButton
                  fullWidth
                  onClick={() => {
                    setIsEdit(false)
                    setDisabledButton(true);
                    setSelectedFile(undefined);
                  }}
                  disabled={buttonLoading}
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

  return <h1>Profile page</h1>;
}

export default UserProfile;
