import React, { useState, useEffect, lazy, Suspense } from "react";
import { useAuth } from "../../contexts/FirebaseContext";
import Stack from "@mui/material/Stack";
import { MarketplaceHeader } from "../../components/layouts";
import ProductCardSkeleton from "../../components/products/ProductCardSkeleton";
import Skeleton from "@mui/material/Skeleton";
import * as ROUTES from "../../constants/routes";

const ProductCard = lazy(() => import("../../components/products/Product"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));

function MarketplaceCategory({ currentUser, userDesc }) {
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFounded, setIsFounded] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWordEntered, setSearchWordEntered] = useState("");
  const [carouselAssets, setCarouselAssets] = useState([]);
  const { fetchCategory, fetchData } = useAuth();

  const onSearchHandler = () => {
    const result = products.filter((product) => {
      const productResult = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (productResult) {
        setIsFounded(true);
        return productResult;
      } else {
        return setIsFounded(false);
      }
    });

    if (searchQuery !== "") {
      setSearchResult(result);
      setIsSearching(true);
    } else {
      setSearchResult([]);
      setIsSearching(false);
    }
  };

  const onBackButtonPressed = () => {
    setIsSearching(false);
    setIsFounded(true);
    setSearchWordEntered("");
    setSearchResult([]);
  };

  useEffect(() => {
    const mainUrl = window.location.href;
    const URL = mainUrl.split("/");
    const category = URL[URL.length - 1];
    const unsubscribe = async () => {
      const productsData = await fetchCategory(category);
      const marketplaceBannerAssets = await fetchData("constants", "global");

      if (marketplaceBannerAssets.marketplace_banner.length > 0) {
        const assetsResult = marketplaceBannerAssets.marketplace_banner.filter(
          (asset) => {
            return asset.category.includes(category);
          }
        );

        setCarouselAssets(assetsResult);
      } else {
        setCarouselAssets([]);
      }
      setProducts(productsData);
    };

    unsubscribe();
  }, [fetchCategory, fetchData]);

  return (
    <Stack className="marketplace-container">
      <MarketplaceHeader
        currentUser={currentUser}
        userDesc={userDesc}
        showSearchIcon={true}
        showCartIcon={true}
        showCategoriesList={true}
        setSearchQuery={setSearchQuery}
        onSearchHandler={onSearchHandler}
        isSearching={isSearching}
        onBackButtonPressed={onBackButtonPressed}
        searchWordEntered={searchWordEntered}
        setSearchWordEntered={setSearchWordEntered}
      />
      {searchResult.length !== 0 && (
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
              <Carousel assets={carouselAssets} auto={false} />
            </Suspense>
          </div>
          <Stack className="marketplace-body" gap={2}>
            <h3>Hasil pencarian</h3>
            <div className="products-row">
              {searchResult?.map((product) => (
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
      {searchResult.length === 0 && isFounded && (
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
                assets={carouselAssets}
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
