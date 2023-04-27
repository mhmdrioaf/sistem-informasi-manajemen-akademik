import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import color from '../../styles/_color.scss';

function Product({ product, productLink }) {
    const rupiah = (number) => {
        return Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number)
    }
    return (
        <Stack id="product-container"
            component="a"
            href={productLink}
            sx={{
                width: {
                    xs: 160,
                    sm: 160,
                    md: 320,
                    lg: 320,
                },
                height: {
                    xs: 224,
                    sm: 224,
                    md: 448,
                    lg: 448,
                },
                backgroundColor: color.primary,
                backgroundImage: `url(${product?.pictures[0]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                border: `.1vw solid ${color.outlineColor}`,
                justifyContent: "flex-end",
                borderRadius: "6%",
                cursor: "pointer",
                overflow: "hidden",
                textDecoration: "none",
                color: color.onTertiaryContainer,
            }}
        >
            <Stack id="product-description"
                gap={2}
                padding={2}
                sx={{
                    backgroundColor: color.tertiaryContainer,
                    color: color.onTertiaryContainer,
                    borderRadius: ".8vw",
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                        lg: "flex",
                    }
                }}
            >
                <Typography fontSize={24}>{product?.name}</Typography>
                <Divider />

                <Stack id="product-description-detail"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack id="product-price"
                        alignItems="flex-start"
                    >
                        <Typography fontSize={12} fontWeight={300}>Harga</Typography>
                        <Typography fontSize={12} fontWeight="bold">{rupiah(product?.price)}</Typography>
                    </Stack>
                    <Stack id="product-sold"
                        alignItems="flex-start"
                    >
                        <Typography fontSize={12} fontWeight={300}>Produk terjual</Typography>
                        <Typography fontSize={12} fontWeight="bold">50pcs</Typography>
                    </Stack>
                    <Stack id="product-rating"
                        alignItems="flex-start"
                    >
                        <Typography fontSize={12} fontWeight={300}>Rating produk</Typography>
                        <Stack direction="row">
                            <AiFillStar color="yellow" />
                            <Typography fontSize={12} fontWeight="bold">4.5</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack id="product-description-small-devices"
                spacing={1}
                sx={{
                    width: "100%",
                    minHeight: "33.333%",
                    backgroundColor: color.tertiaryContainer,
                    padding: ".8em",
                    display: {
                        xs: "flex",
                        sm: "flex",
                        md: "none",
                        lg: "none",
                    },
                    // borderTopLeftRadius: "12%",
                    // borderTopRightRadius: "12%",
                    borderRadius: "6%"
                }}
            >
                <Typography fontSize=".8rem">{product?.name}</Typography>
                <Typography fontSize=".8rem" fontWeight="bold">{rupiah(product?.price)}</Typography>
                <Stack direction="row">
                    <Stack
                        alignItems="flex-start"
                        direction="row"
                        spacing={1}
                    >
                        <Typography fontSize=".8rem" fontWeight="bold">4.5</Typography>
                        <div id="divider"
                            style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: color.outlineColor,
                            }}
                        />
                        <Typography fontSize=".8rem">Terjual: 50</Typography>
                    </Stack>
                </Stack>
            </Stack>

        </Stack >
    )
}

export default Product;
