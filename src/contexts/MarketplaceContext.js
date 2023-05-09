import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./FirebaseContext";

const MarketplaceContext = React.createContext();
export function useMarketplace() {
  return useContext(MarketplaceContext);
}

export function MarketplaceProvider({ children }) {
  const [isFounded, setIsFounded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [products, setProducts] = useState([]);
  const [bannerAssets, setBannerAssets] = useState([]);
  const [searchFieldAnchorElement, setSearchFieldAnchorElement] =
    useState(null);

  const { fetchCollection, fetchData } = useAuth();

  useEffect(() => {
    const unsubscribe = async () => {
      const productsData = await fetchCollection("products");
      const bannerAssets = await fetchData("constants", "global");

      if (bannerAssets?.marketplace_banner?.length !== 0) {
        setBannerAssets(bannerAssets?.marketplace_banner);
      } else {
        setBannerAssets([]);
      }

      if (productsData?.length !== 0) {
        setProducts(productsData);
      } else {
        setProducts([]);
      }
    };

    unsubscribe();
  }, [fetchCollection, fetchData]);

  function searchProducts(products, query) {
    setSearchFieldAnchorElement(null);
    const filteredProducts = products.filter((product) => {
      const searchResult = product.name
        .toLowerCase()
        .includes(query.toLowerCase());

      if (searchResult) {
        setIsFounded(true);
        return searchResult;
      } else {
        return setIsFounded(false);
      }
    });

    if (query !== "") {
      setFilteredProducts(filteredProducts);
      setIsSearching(true);
    } else {
      setFilteredProducts([]);
      setIsSearching(false);
    }
  }

  function backButtonPressHandler() {
    setIsSearching(false);
    setIsFounded(true);
    setSearchInputValue("");
    setFilteredProducts([]);
  }

  const value = {
    isFounded,
    isSearching,
    searchInputValue,
    products,
    filteredProducts,
    bannerAssets,
    searchQuery,
    searchFieldAnchorElement,

    searchProducts,
    backButtonPressHandler,

    setSearchInputValue,
    setSearchFieldAnchorElement,
    setSearchQuery,
  };
  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}
