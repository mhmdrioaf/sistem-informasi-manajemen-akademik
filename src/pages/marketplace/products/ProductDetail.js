import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/FirebaseContext";
import FullPageLoading from "../../../components/indicators/PrimaryLoading";
import "../Marketplace.scss";
import { MarketplaceHeader } from "../../../components/layouts";
import { Stack, Divider, Modal, IconButton, Box } from "@mui/material";
import color from "../../../styles/_color.scss";
import { IoMdCart, IoMdClose, IoMdStar } from "react-icons/io";
import InfoButton from "../../../components/buttons/InfoButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

function ProductDetail({ currentUser, userDesc }) {
  const [isLoading, setIsLoading] = useState(true);
  const [viewPicture, setViewPicture] = useState(false);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const { fetchData } = useAuth();
  const URL = window.location.href;

  const handleViewPicture = (index) => {
    setPictureIndex(index);
    setViewPicture(true);
  };
  const handleClosePicture = () => {
    setViewPicture(false);
    setPictureIndex(0);
  };

  const rupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const productId = URL.substring(URL.lastIndexOf("/") + 1);
      const productData = await fetchData("products", productId);

      if (productData !== null) {
        setProduct(productData);
        setIsLoading(false);
      } else {
        setProduct(null);
        setIsLoading(false);
      }
    };

    return unsubscribe;
  }, [fetchData, URL]);

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
      {product?.pictures && (
        <Modal open={viewPicture} onClose={handleClosePicture}>
          <Box
            sx={{
              width: 400,
              height: "auto",
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: color.surface,
              outline: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                zIndex: 1,
              }}
              onClick={handleClosePicture}
            >
              <IoMdClose />
            </IconButton>
            <img
              src={product?.pictures[pictureIndex]}
              width={400}
              height="auto"
              alt="product"
            />
          </Box>
        </Modal>
      )}
      <Stack className="container">
        <MarketplaceHeader
          currentUser={currentUser}
          userDesc={userDesc}
          showSearhIcon={false}
          showCartIcon={true}
          showCategoriesList={false}
        />
        {product && (
          <Stack
            id="product-detail-container"
            spacing={{
              xs: 4,
              sm: 4,
              md: 8,
              lg: 8,
            }}
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            }}
            sx={{
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <Stack
              id="product-detail-images-container"
              direction="column"
              gap={2}
              sx={{
                alignSelf: "center",
              }}
            >
              <img
                id="main-product-image"
                style={{
                  width: "100%",
                  height: 400,
                  border: `1px solid ${color.outlineColor}`,
                  cursor: "pointer",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                alt="main-product"
                src={product?.pictures[0]}
                onClick={() => {
                  setPictureIndex(0);
                  setViewPicture(true);
                }}
              />

              <Stack
                id="product-other-images"
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                {product.pictures.map((picture, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: {
                        xs: 96,
                        sm: 96,
                        md: 128,
                        lg: 128,
                      },
                      height: 128,
                      backgroundImage: `url(${picture})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      border: `1px solid ${color.outlineColor}`,
                      cursor: "pointer",
                    }}
                    onClick={() => handleViewPicture(index)}
                  />
                ))}
              </Stack>
            </Stack>

            <Divider
              orientation="horizontal"
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                  lg: "none",
                },
              }}
            />

            <Stack
              id="product-detail-description-container"
              spacing={4}
              direction="column"
              sx={{
                flexGrow: 2,
                justifyContent: "space-around",
              }}
            >
              <p
                id="product-category-name"
                style={{
                  color: color.outlineColor,
                  fontWeight: "medium",
                }}
              >
                {product.category}
              </p>

              <p
                id="product-name-main"
                style={{
                  fontSize: "2rem",
                }}
              >
                {product.name}
              </p>

              <Stack
                id="product-rating"
                direction="row"
                spacing={2}
                sx={{
                  color: color.outlineColor,
                }}
              >
                <Stack direction="row" sx={{}}>
                  <IoMdStar />
                  <p>4,6</p>
                </Stack>
                <Divider orientation="vertical" />
                <p>32 Reviews</p>
              </Stack>

              <Stack>
                <p
                  id="product-price"
                  style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {rupiah(product.price)}
                </p>
                <p
                  id="product-stock"
                  style={{
                    color: color.outlineColor,
                  }}
                >
                  {`Stok tersedia: ${product.stock}`}
                </p>
              </Stack>

              <Divider />

              <Stack id="product-description">
                <b>Tentang Produk</b>
                <p style={{ color: color.outlineColor }}>
                  {product.description}
                </p>
              </Stack>

              <Divider />

              <Stack
                id="action-button-container"
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <InfoButton>
                  <IoMdCart />
                </InfoButton>
                <PrimaryButton
                  sx={{
                    backgroundColor: color.primaryContainer,
                    color: color.onPrimaryContainer,
                    "&:hover": {
                      backgroundColor: color.primary,
                      color: color.onPrimary,
                    },
                  }}
                >
                  Buy now
                </PrimaryButton>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default ProductDetail;
