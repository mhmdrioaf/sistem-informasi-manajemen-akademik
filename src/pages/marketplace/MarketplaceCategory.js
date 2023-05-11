import React, { useState, useEffect, lazy, Suspense } from "react";
import { useAuth } from "../../contexts/FirebaseContext";
import Stack from "@mui/material/Stack";
import { MarketplaceHeader } from "../../components/layouts";
import ProductCardSkeleton from "../../components/products/ProductCardSkeleton";
import Skeleton from "@mui/material/Skeleton";
import * as ROUTES from "../../constants/routes";
import { useMarketplace } from "../../contexts/MarketplaceContext";

const ProductCard = lazy(() => import("../../components/products/Product"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));

function MarketplaceCategory() {
  const [products, setProducts] = useState([]);
  const [categoryBannerAssets, setCategoryBannerAssets] = useState([]);
  const { fetchCategory } = useAuth();
  const {
    bannerAssets,
    searchProducts,
    backButtonPressHandler,
    isSearching,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    searchInputValue,
    setSearchInputValue,
    searchFieldAnchorElement,
    setSearchFieldAnchorElement,
    isFounded,
  } = useMarketplace();

  useEffect(() => {
    const mainUrl = window.location.href;
    const URL = mainUrl.split("/");
    const category = URL[URL.length - 1];
    const unsubscribe = async () => {
      const productsData = await fetchCategory(category);

      if (bannerAssets.length !== 0) {
        const assetsResult = bannerAssets.filter((asset) => {
          return asset.category.includes(category);
        });

        setCategoryBannerAssets(assetsResult);
      } else {
        setCategoryBannerAssets([]);
      }
      setProducts(productsData);
    };

    unsubscribe();
  }, [fetchCategory, bannerAssets]);

  return (
    <Stack className="marketplace-container">
      <MarketplaceHeader
        showSearchIcon={true}
        showCartIcon={true}
        showCategoriesList={true}
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
              <Carousel
                assets={categoryBannerAssets}
                auto={false}
                showArrows={false}
                setUrl={false}
              />
            </Suspense>
          </div>
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
        </>
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
              <Carousel
                assets={categoryBannerAssets}
                auto={false}
                showArrows={false}
                setUrl={false}
              />
            </Suspense>
          </div>
          <Stack className="marketplace-body" gap={2}>
            {products.length === 0 && (
              <p>Masih belum ada produk dalam kategori ini...</p>
            )}

            {products.length !== 0 && (
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
            )}
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

export default MarketplaceCategory;
