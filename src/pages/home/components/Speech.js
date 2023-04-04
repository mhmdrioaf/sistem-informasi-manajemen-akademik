import React from "react";
import { Stack, Typography } from "@mui/material";
import "./Speech.scss";
import color from "../../../styles/_color.scss";
import { principalImg } from "../../../img";

function Speech() {
  const speechText =
    "Assalamu'alaikum Wr.Wb \n \n Selamat datang di website kami Sekolah Menengah Kejuruan Swasta Korporasi Garut. Media ini saya tunjukan untuk seluruh unsur pimpinan, guru, karyawan dan siswa serta masyarakat guna dapat mengakses seluruh informasi tentang segala profil, kegiatan serta fasilitas sekolah kami. \n \n Saya selaku pimpinan mengucapkan terima kasih kepada Tim Manajemen yang telah berusaha untuk dapat lebih memperkenalkan segala perihal yang dimiliki oleh sekolah. Saya berharap website ini dapat dijadikan sarana interaksi yang positif baik antar warga sekolah maupun masyarakat pada umumnya sehingga informasi dapat tersampaikan dengan baik. Semoga Allah SWT memberikan kekuaran bagi kita semua untuk mencerdaskan anak-anak bangsa. \n \n Wassalamu'alaikum Wr.Wb";

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "6.4rem",
        borderBottom: `.1vw solid ${color.subtitleOnSurface}`,
      }}
    >
      {/* speech title */}
      <Stack direction="column" spacing={2}>
        <Typography
          sx={{
            fontSize: "1.6em",
            color: color.onSurface,
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
        direction="row"
        spacing={4}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <div
          style={{
            backgroundImage: `url(${principalImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            width: "24vw",
            height: "24vw",
            borderRadius: "1.6vw",
            boxShadow: `0 0 .4vw ${color.subtitleOnSurface}`,
          }}
        />

        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "1em",
              color: color.subtitleOnSurface,
              whiteSpace: "pre-line",
              width: "100%",
            }}
          >
            {speechText}
          </Typography>

          <Typography
            sx={{
              fontSize: "1em",
              color: color.subtitleOnSurface,
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
