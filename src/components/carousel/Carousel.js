import { IconButton, Link, Skeleton } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import color from "../../styles/_color.scss";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import "./Carousel.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Carousel({ assets, auto = true, showArrows = true, setUrl = true }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrevClick = useCallback(() => {
    setActiveIndex(activeIndex === 0 ? assets?.length - 1 : activeIndex - 1);
  }, [activeIndex, assets?.length]);
  const handleNextClick = useCallback(() => {
    setActiveIndex(activeIndex === assets?.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, assets?.length]);

  useEffect(() => {
    if (auto) {
      const handleAutoNextClick = () => {
        handleNextClick();
      };
      const intervalId = setInterval(handleAutoNextClick, 3000);

      return () => clearInterval(intervalId);
    }
  }, [handleNextClick, auto]);

  return (
    <div className="carousel-container">
      {assets?.length > 0 && (
        <>
          <Link
            underline="none"
            href={
              setUrl
                ? `/marketplace/category/${assets[activeIndex].category}`
                : "#"
            }
          >
            <div
              id="dim"
              style={{
                backgroundColor: color.primary,
                width: "100%",
                minHeight: "50vh",
                opacity: ".2",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <div
              id="dim"
              style={{
                backgroundColor: "black",
                width: "100%",
                minHeight: "50vh",
                opacity: ".2",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <LazyLoadImage
              src={assets[activeIndex].image}
              height="50vh"
              width="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                width: "100%",
                minHeight: "50vh",
              }}
            />
          </Link>
          {showArrows && (
            <>
              <IconButton
                disableRipple
                size="medium"
                sx={{
                  backgroundColor: color.primaryContainer,
                  color: color.onPrimaryContainer,
                  borderRadius: ".4vw",
                  "&:hover": {
                    backgroundColor: color.primary,
                    color: color.onPrimary,
                  },
                  position: "absolute",
                  top: "50%",
                  left: "1rem",
                  transform: "translateY(-50%)",
                }}
                onClick={handlePrevClick}
              >
                <IoMdArrowBack />
              </IconButton>
              <IconButton
                disableRipple
                size="medium"
                sx={{
                  backgroundColor: color.primaryContainer,
                  color: color.onPrimaryContainer,
                  borderRadius: ".4vw",
                  "&:hover": {
                    backgroundColor: color.primary,
                    color: color.onPrimary,
                  },
                  position: "absolute",
                  top: "50%",
                  right: "1rem",
                  transform: "translateY(-50%)",
                }}
                onClick={handleNextClick}
              >
                <IoMdArrowForward />
              </IconButton>
            </>
          )}
          <div
            id="category-text"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: color.onPrimary,
            }}
          >
            <h3>{assets[activeIndex]?.name}</h3>
            <h3
              style={{
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: `.5px ${color.onPrimary}`,
              }}
            >
              {assets[activeIndex]?.name}
            </h3>
          </div>
        </>
      )}

      {!assets && (
        <Skeleton variant="rounded" sx={{ width: "100%", minHeight: "50vh" }} />
      )}
    </div>
  );
}

export default Carousel;
