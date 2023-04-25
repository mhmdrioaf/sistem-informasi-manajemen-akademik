import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import color from '../../styles/_color.scss';

function Product({ product }) {
    const rupiah = (number) => {
        return Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number)
    }
    return (
        <Stack id="product-container"
            sx={{
                width: "22.222vw",
                height: "31.111vw",
                backgroundColor: color.primary,
                backgroundImage: `url(${product?.pictures[0]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                border: `.1vw solid ${color.outlineColor}`,
                justifyContent: "flex-end",
                borderRadius: ".8vw",
                cursor: "pointer",
            }}
        >
            <Stack id="product-description"
                gap={2}
                padding={2}
                sx={{
                    backgroundColor: color.tertiaryContainer,
                    color: color.onTertiaryContainer,
                    borderRadius: ".8vw",
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

        </Stack >
    )
}

export default Product;
