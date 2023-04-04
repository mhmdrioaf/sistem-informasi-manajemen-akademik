import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";
import {
  carousel_1,
  carousel_2,
  carousel_3,
  carousel_4,
  carousel_5,
} from "../../../img";
import "./Slider.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function Slider() {
  const imageData = [
    {
      label: "Image 1",
      alt: "image 1",
      url: carousel_1,
    },
    {
      label: "Image 2",
      alt: "image 2",
      url: carousel_2,
    },
    {
      label: "Image 3",
      alt: "image 3",
      url: carousel_3,
    },
    {
      label: "Image 4",
      alt: "image 4",
      url: carousel_4,
    },
    {
      label: "Image 5",
      alt: "image 5",
      url: carousel_5,
    },
  ];

  return (
    <Swiper
      effect={"fade"}
      modules={[Pagination, Autoplay, EffectFade]}
      loop={true}
      autoplay={{
        disableOnInteraction: true,
        delay: 2500,
      }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      }}
      className="mySwiper"
    >
      {imageData.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="dim" />
          <img key={image.label} src={image.url} alt={image.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
