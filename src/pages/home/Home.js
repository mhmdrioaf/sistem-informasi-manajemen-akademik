import React from "react";
import { carousel_1, carousel_2, carousel_3 } from "../../img";
import { Box } from "@mui/material";
function Home() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${carousel_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        tes tes
      </Box>
    </>
  );
}

export default Home;
