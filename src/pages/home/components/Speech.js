import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import "./Speech.scss";
import color from "../../../styles/_color.scss";
import { principalImg } from "../../../img";
import AOS from "aos";
import "aos/dist/aos.css";

function Speech() {
  const speechText =
    "Assalamu'alaikum Wr.Wb \n \n Selamat datang di website kami Sekolah Menengah Kejuruan Swasta Korporasi Garut. Media ini saya tunjukan untuk seluruh unsur pimpinan, guru, karyawan dan siswa serta masyarakat guna dapat mengakses seluruh informasi tentang segala profil, kegiatan serta fasilitas sekolah kami. \n \n Saya selaku pimpinan mengucapkan terima kasih kepada Tim Manajemen yang telah berusaha untuk dapat lebih memperkenalkan segala perihal yang dimiliki oleh sekolah. Saya berharap website ini dapat dijadikan sarana interaksi yang positif baik antar warga sekolah maupun masyarakat pada umumnya sehingga informasi dapat tersampaikan dengan baik. Semoga Allah SWT memberikan kekuaran bagi kita semua untuk mencerdaskan anak-anak bangsa. \n \n Wassalamu'alaikum Wr.Wb";

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: {
          xs: "1.6rem",
          sm: "1.6rem",
          md: "6.4rem",
          lg: "6.4rem",
        },
        borderBottom: `.1vw solid ${color.outline}`,
      }}
    >
      {/* speech title */}
      <Stack
        direction="column"
        data-aos="zoom-in"
        spacing={2}
        sx={{
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.6em",
            textAlign: "left",
            color: color.onBackgroundColor,
            whiteSpace: "pre-line",
            fontWeight: "bold",
          }}
        >
          {"Sambutan \n Kepala Sekolah"}
        </Typography>
        <div className="divider" />
      </Stack>

      {/* speech container */}
      <Stack
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-sine"
        data-aos-delay="300"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          },
          gap: "3.2vw",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${principalImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            width: {
              xs: "64vw",
              sm: "64vw",
              md: "32vw",
              lg: "24vw",
            },
            height: {
              xs: "86vw",
              sm: "86vw",
              md: "32vw",
              lg: "24vw",
            },
            borderRadius: "1.6vw",
            boxShadow: `0 0 .4vw ${color.outline}`,
          }}
        />

        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "1em",
              color: color.outline,
              whiteSpace: "pre-line",
              width: "100%",
              textAlign: {
                xs: "justify",
                sm: "justify",
                md: "left",
                lg: "left",
              },
            }}
          >
            {speechText}
          </Typography>

          <Typography
            sx={{
              fontSize: "1em",
              color: color.outline,
              whiteSpace: "pre-line",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Rio Ananta, S.Kom., M.Kom
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Speech;
