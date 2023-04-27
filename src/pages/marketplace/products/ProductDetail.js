import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/FirebaseContext";
import FullPageLoading from "../../../components/indicators/PrimaryLoading";
import "../Marketplace.scss";
import { MarketplaceHeader } from "../../../components/layouts";
import { Stack, Box, Divider } from "@mui/material";
import color from "../../../styles/_color.scss";
import { IoMdCart, IoMdStar } from "react-icons/io";
import InfoButton from "../../../components/buttons/InfoButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

function ProductDetail({ currentUser, userDesc }) {

    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const { fetchData } = useAuth();
    const URL = window.location.href;

    const rupiah = (number) => {
        return Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number)
    }

    useEffect(() => {
        const unsubscribe = async () => {
            const productId = URL.substring(URL.lastIndexOf("/") + 1);
            const productData = await fetchData("products", productId);

            if (productData !== null) {
                setProduct(productData)
                setIsLoading(false)
            } else {
                setProduct(null);
                setIsLoading(false)
            }
        }

        return unsubscribe;
    }, [fetchData, URL])

    if (isLoading) {
        return <FullPageLoading />
    }

    return (
        <Stack className="container">
            <MarketplaceHeader currentUser={currentUser} userDesc={userDesc} showSearhIcon={false} />
            {product && (
                <Stack id="product-detail-container"
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
                    <Stack id="product-detail-images-container"
                        direction="column"
                        gap={2}
                        sx={{
                            alignSelf: "center",
                        }}
                    >

                        <Box id="main-product-image"
                            sx={{
                                width: "100%",
                                height: 400,
                                backgroundImage: `url(${product.pictures[0]})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                border: `1px solid ${color.outlineColor}`,
                                cursor: "pointer",
                            }}
                        />

                        <Stack id="product-other-images"
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
                                            lg: 128
                                        },
                                        height: 128,
                                        backgroundImage: `url(${picture})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        border: `1px solid ${color.outlineColor}`,
                                        cursor: "pointer",
                                    }}
                                />
                            ))}
                        </Stack>
                    </Stack>

                    <Divider orientation="horizontal"
                        sx={{
                            display: {
                                xs: "block",
                                sm: "block",
                                md: "none",
                                lg: "none",
                            }
                        }}
                    />

                    <Stack id="product-detail-description-container"
                        spacing={4}
                        direction="column"
                        sx={{
                            flexGrow: 2,
                            justifyContent: "space-around"
                        }}
                    >
                        <p id="product-category-name"
                            style={{
                                color: color.outlineColor,
                                fontWeight: "medium",
                            }}
                        >
                            {product.category}
                        </p>

                        <p id="product-name-main"
                            style={{
                                fontSize: "2rem"
                            }}
                        >
                            {product.name}
                        </p>

                        <Stack id="product-rating"
                            direction="row"
                            spacing={2}
                            sx={{
                                color: color.outlineColor
                            }}
                        >
                            <Stack direction="row" sx={{
                            }}>
                                <IoMdStar />
                                <p>4,6</p>
                            </Stack>
                            <Divider orientation="vertical" />
                            <p>32 Reviews</p>
                        </Stack>

                        <Stack>
                            <p id="product-price"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "2rem",
                                }}
                            >
                                {rupiah(product.price)}
                            </p>
                            <p id="product-stock"
                                style={{
                                    color: color.outlineColor
                                }}
                            >
                                {`Stok tersedia: ${product.stock}`}
                            </p>
                        </Stack>

                        <Divider />

                        <Stack id="product-description"

                        >
                            <b>Tentang Produk</b>
                            <p style={{ color: color.outlineColor }}>{product.description}</p>
                        </Stack>

                        <Divider />

                        <Stack id="action-button-container"
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <InfoButton><IoMdCart /></InfoButton>
                            <PrimaryButton
                                sx={{
                                    backgroundColor: color.primaryContainer,
                                    color: color.onPrimaryContainer,
                                    "&:hover": {
                                        backgroundColor: color.primary,
                                        color: color.onPrimary,
                                    }
                                }}
                            >
                                Buy now
                            </PrimaryButton>
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </Stack>
    )
}

export default ProductDetail;
