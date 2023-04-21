import React, { useEffect } from "react";
import color from "../../../styles/_color.scss";
import { Box, Stack, Typography } from "@mui/material";
import "./Speech.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { carousel_1, carousel_5 } from "../../../img";
import "./About.scss";

function About() {
  const aboutText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet sagittis lorem, non molestie diam mollis a. Phasellus laoreet velit venenatis enim porta ultricies. Suspendisse sem quam, auctor at pretium quis, iaculis sed massa. Pellentesque auctor justo vestibulum, tristique dui ac, interdum dui. Aenean feugiat lorem urna, vel laoreet purus aliquet ac. Cras sed facilisis lectus, eget ultricies elit. Vestibulum sodales erat vel condimentum fringilla. Curabitur vel felis et sapien sagittis bibendum. Etiam eu dui finibus, sagittis sapien quis, ultricies lacus. Morbi id ullamcorper ligula. Sed sit amet rhoncus lorem, vel laoreet diam. Sed eget dui iaculis, porta felis eu, pellentesque nisi. Curabitur quis elit in magna tincidunt mollis. \n \n Fusce vestibulum, diam in luctus luctus, ligula lorem mollis elit, vitae porttitor magna velit vitae quam. Maecenas pulvinar, dui at convallis laoreet, felis quam tincidunt elit, in molestie purus est id ex. Integer dapibus, diam sed feugiat molestie, erat purus accumsan dolor, at suscipit dui sem in nisl. Duis efficitur, odio quis vulputate dictum, eros mauris bibendum risus, in laoreet massa lectus quis magna. Nulla nec ultricies nunc. Ut finibus, ex nec posuere eleifend, mi mauris mollis lectus, a posuere nisl nunc id orci. In non egestas nunc. \n \n Etiam sit amet enim vel lacus efficitur euismod vitae a dui. Mauris vehicula consectetur quam. Praesent mattis dui id ipsum convallis bibendum. Ut egestas urna neque, quis fringilla orci convallis eget. Suspendisse nulla tortor, porta vel libero nec, dapibus faucibus est. Vivamus ipsum ipsum, pellentesque non mollis nec, lacinia id ligula. Morbi eget lacinia felis. Maecenas non ornare orci, ac gravida lectus. Praesent feugiat justo eu dolor aliquet faucibus ut et justo.";

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
      <Stack direction="column" spacing={2} data-aos="zoom-in">
        <Typography
          sx={{
            fontSize: "1.6em",
            color: color.onBackgroundColor,
            whiteSpace: "pre-line",
            fontWeight: "bold",
          }}
        >
          {"Tentang \n SMKS Korporasi Garut"}
        </Typography>
        <div className="divider" />

        <Stack
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
          {/* about text container */}
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: "100%" }}
            data-aos="fade-zoom-in"
            data-aos-duration={2000}
          >
            <Typography
              sx={{
                fontSize: "1em",
                color: color.outline,
                whiteSpace: "pre-line",
                width: "100%",
                textAlign: "justify",
              }}
            >
              {aboutText}
            </Typography>
          </Stack>

          {/* images container */}
          <Box
            className="about__images__container"
            sx={{
              flexDirection: {
                xs: "row",
                sm: "row",
              },
            }}
          >
            <Box
              data-aos="fade-left"
              data-aos-duration={2000}
              className="about__img"
              sx={{
                backgroundImage: `url(${carousel_1})`,
              }}
            />
            <Box
              data-aos="fade-right"
              data-aos-duration={2000}
              className="about__img__second"
              sx={{
                backgroundImage: `url(${carousel_5})`,
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default About;
