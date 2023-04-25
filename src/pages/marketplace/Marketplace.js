import React, { useState, useEffect } from "react";
import { MarketplaceHeader } from "../../components/layouts";
import Product from "../../components/products/Product";
import { Stack, Typography } from "@mui/material";
import { useAuth } from "../../contexts/FirebaseContext";
import "./Marketplace.scss";

function Marketplace({ currentUser, userDesc }) {
    const [products, setProducts] = useState(null);
    const { fetchCollection } = useAuth();

    useEffect(() => {
        const unsub = async () => {
            const productsData = await fetchCollection("products")

            if (productsData?.length > 0) {
                setProducts(productsData)
            } else {
                setProducts(null)
            }
        }

        unsub();
    }, [fetchCollection])
    return (
        <Stack gap={4} className="container">
            <MarketplaceHeader currentUser={currentUser} userDesc={userDesc} />
            <Stack id="marketplace-body"
                alignItems="flex-start"
                gap={2}
            >
                <Typography fontSize="1.6em" fontWeight="medium" fontFamily="inherit">Produk Pilihan</Typography>
                {products?.map((product) => (
                    <Product product={product} />
                ))}
            </Stack>
        </Stack>
    )
}

export default Marketplace;