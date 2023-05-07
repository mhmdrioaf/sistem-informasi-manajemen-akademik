import { Skeleton, Stack } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { MarketplaceHeader } from "../../components/layouts";
import ProductCardSkeleton from "../../components/products/ProductCardSkeleton";
import * as ROUTES from "../../constants/routes";
import { useAuth } from "../../contexts/FirebaseContext";
import "./Marketplace.scss";

const ProductCard = lazy(() => import("../../components/products/Product"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));

function Marketplace({ currentUser, userDesc }) {
  const [products, setProducts] = useState(null);
  const [carouselAssets, setCarouselAssets] = useState([]);
  const { fetchCollection, fetchData } = useAuth();

  useEffect(() => {
    const unsub = async () => {
      const productsData = await fetchCollection("products");
      const marketplaceBannerAssets = await fetchData("constants", "global");

      if (marketplaceBannerAssets.marketplace_banner.length > 0) {
        setCarouselAssets(marketplaceBannerAssets);
      } else {
        setCarouselAssets([]);
      }

      if (productsData?.length > 0) {
        setProducts(productsData);
      } else {
        setProducts(null);
      }
    };

    unsub();
  }, [fetchCollection, fetchData]);
  return (
    <Stack className="marketplace-container">
      <MarketplaceHeader
        currentUser={currentUser}
        userDesc={userDesc}
        showSearchIcon={true}
        showCartIcon={true}
        showCategoriesList={true}
      />
      <div className="marketplace-banner-container">
        <Suspense
          fallback={
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: "50vh" }}
            />
          }
        >
          <Carousel assets={carouselAssets.marketplace_banner} />
        </Suspense>
      </div>
      <Stack className="marketplace-body" gap={2}>
        <h3>Produk Pilihan</h3>
        <div className="products-row">
          {products?.map((product) => (
            <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
              <ProductCard
                product={product}
                productLink={ROUTES.PRODUCT_DETAIL(product.id)}
              />
            </Suspense>
          ))}
        </div>
      </Stack>
    </Stack>
  );
}

export default Marketplace;
