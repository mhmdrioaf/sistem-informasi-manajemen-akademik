import { Skeleton, Stack } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { MarketplaceHeader } from "../../components/layouts";
import ProductCardSkeleton from "../../components/products/ProductCardSkeleton";
import * as ROUTES from "../../constants/routes";
import { useMarketplace } from "../../contexts/MarketplaceContext";
import "./Marketplace.scss";

const ProductCard = lazy(() => import("../../components/products/Product"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));

function Marketplace() {
  const {
    products,
    filteredProducts,
    isSearching,
    isFounded,
    searchQuery,
    bannerAssets,
    searchInputValue,
    searchProducts,
    searchFieldAnchorElement,
    backButtonPressHandler,
    setSearchInputValue,
    setSearchQuery,
    setSearchFieldAnchorElement,
  } = useMarketplace();

  return (
    <Stack className="marketplace-container">
      <MarketplaceHeader
        setSearchQuery={setSearchQuery}
        onSearchHandler={() => searchProducts(products, searchQuery)}
        isSearching={isSearching}
        onBackButtonPressed={backButtonPressHandler}
        searchWordEntered={searchInputValue}
        setSearchWordEntered={setSearchInputValue}
        anchorElement={searchFieldAnchorElement}
        setAnchorElement={setSearchFieldAnchorElement}
      />
      {filteredProducts.length !== 0 && (
        <Stack className="marketplace-body" gap={2}>
          <h3>Hasil pencarian</h3>
          <div className="products-row">
            {filteredProducts?.map((product) => (
              <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
                <ProductCard
                  product={product}
                  productLink={ROUTES.PRODUCT_DETAIL(product.id)}
                />
              </Suspense>
            ))}
          </div>
        </Stack>
      )}
      {filteredProducts.length === 0 && isFounded && (
        <>
          <div className="marketplace-banner-container">
            <Suspense
              fallback={
                <Skeleton
                  variant="rounded"
                  sx={{ width: "100%", height: "50vh" }}
                />
              }
            >
              <Carousel assets={bannerAssets} />
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
        </>
      )}
      {!isFounded && (
        <Stack
          className="marketplace-body"
          gap={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <p className="product-not-found">Produk tidak ditemukan...</p>
        </Stack>
      )}
    </Stack>
  );
}

export default Marketplace;
