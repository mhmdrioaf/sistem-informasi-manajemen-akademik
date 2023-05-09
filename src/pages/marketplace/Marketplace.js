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
  const [isSearching, setIsSearching] = useState(false);
  const [isFounded, setIsFounded] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWordEntered, setSearchWordEntered] = useState("");
  const [carouselAssets, setCarouselAssets] = useState([]);
  const { fetchCollection, fetchData } = useAuth();

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
        setSearchQuery={setSearchQuery}
        onSearchHandler={onSearchHandler}
        isSearching={isSearching}
        onBackButtonPressed={onBackButtonPressed}
        searchWordEntered={searchWordEntered}
        setSearchWordEntered={setSearchWordEntered}
      />
      {searchResult.length !== 0 && (
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
