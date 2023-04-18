import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/FirebaseContext";
import { Divider, Stack, Box, Typography, Alert, InputAdornment } from "@mui/material";
import BasicTextField from "../../../components/textfields/BasicTextField";
import color from "../../../styles/_color.scss";
import DangerButton from "../../../components/buttons/DangerButton";
import InfoButton from "../../../components/buttons/InfoButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import TitleText from "../../../components/texts/TitleText";
import "../User.scss";

function UserProfile({ currentUser, userDesc }) {
  const { logout, verifyEmail, authErrorHandler, editUserData } = useAuth();
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(currentUser.emailVerified);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState();
  const [editedUser, setEditedUser] = useState({});

  const userData = [
    {
      name: "Nama",
      value: currentUser.displayName
        ? currentUser.displayName
        : false,
      type: "text"
    },
    { name: "Email", value: currentUser.email, verified: currentUser.emailVerified, type: "email" },
    { name: "Nomor telepon", value: userDesc.phoneNumber ? userDesc.phoneNumber : false, type: "number" },
    { name: "User ID", value: currentUser.uid, type: "user-id" },
    { name: "Alamat", value: userDesc.address ? userDesc.address : false, type: "text" }
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

  const editUserHandler = async (e) => {
    e.preventDefault();

    const editUserDataStats = await editUserData(editedUser)

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

  // TODO: Make user can edit their password and add their profile picture as their identity.

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
                  <table className="user__profile__table">
                    <tbody>
                      {userData.map((data) => (
                        <tr key={data.name}>
                          <td key={data.name}>
                            <Typography color={color.subtitleOnSurface}>
                              {data.name}
                            </Typography>
                          </td>
                          <td key={data.value}>
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
                  <table className="user__profile__table">
                    <tbody>
                      {userData.map((data) => (
                        <tr key={data.name}>
                          <td key={data.name}>
                            <Typography color={color.subtitleOnSurface}>
                              {data.name}
                            </Typography>
                          </td>
                          <td key={data.value}>
                            {data.type !== "email" && data.type !== "user-id" && (
                              <>
                                <BasicTextField
                                  type={data.type}
                                  label={data.name}
                                  InputProps={{
                                    startAdornment: (
                                      <>
                                        {data.type === "number" && (
                                          <InputAdornment sx={{ mr: 2 }}>
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
                                        ? "8515815815"
                                        : data.value
                                  }
                                  onChange={(e) => {
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
                                            phoneNumber: userDesc?.phoneNumber
                                          }))
                                        } else {
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            phoneNumber: e.target.value,
                                          }))
                                        }
                                      case "Alamat":
                                        if (e.target.value === "") {
                                          e.target.value = ""
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            address: userDesc?.address
                                          }))
                                        } else {
                                          return setEditedUser((prev) => ({
                                            ...prev,
                                            address: e.target.value,
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
                <PrimaryButton fullWidth onClick={(e) => editUserHandler(e)} disabled={buttonLoading}>
                  Simpan
                </PrimaryButton>
                <DangerButton fullWidth onClick={() => setIsEdit(false)} disabled={buttonLoading}>Batal</DangerButton>
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
