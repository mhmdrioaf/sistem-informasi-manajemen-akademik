import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/FirebaseContext";
import { Badge, IconButton, Stack } from "@mui/material";
import * as ROUTES from "../../../constants/routes";
import color from "../../../styles/_color.scss";
import { MarketplaceHeader } from "../../../components/layouts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function UserCart({ currentUser, userDesc }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [seller, setSeller] = useState({});
  const [totalCost, setTotalCost] = useState(15000);
  const { fetchData, updateData } = useAuth();

  let cartProductsTemp = userDesc?.cart;

  const rupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const changeProductQuantity = async (index, options) => {
    let currentCartProducts = [...cartProducts];
    let product = { ...currentCartProducts[index] };
    let productIndex = cartProductsTemp.indexOf(product.id);
    let totalProduct = cartProductsTemp.filter(
      (item) => item === product.id
    ).length;

    switch (options) {
      case "increment":
        product.quantity = product.quantity + 1;
        cartProductsTemp.push(product.id);
        break;
      case "decrement":
        product.quantity = product.quantity - 1;
        if (productIndex > -1) cartProductsTemp.splice(productIndex, 1);
        break;
      case "delete":
        product.quantity = 0;
        if (productIndex > -1)
          cartProductsTemp.splice(productIndex, totalProduct);
        break;
      default:
        product.quantity = 1;
        break;
    }

    await updateData("users", currentUser?.uid, "cart", cartProductsTemp);
    setCartProducts(currentCartProducts);
  };
  useEffect(() => {
    async function showProducts() {
      const userCart = userDesc.cart;
      userCart.map(async (product) => {
        const productData = await fetchData("products", product);
        const sellerData = await fetchData("users", productData?.seller_id);

        const productQuantity = userDesc.cart.filter(
          (item) => item === product
        ).length;

        if (productQuantity > 0) {
          setCartProducts(() => [
            {
              id: productData.id,
              name: productData.name,
              seller_id: productData.sellerId,
              price: productData.price,
              pictures: productData.pictures,
              quantity: productQuantity,
            },
          ]);
        } else {
          setCartProducts((prev) => [
            ...prev,
            {
              id: productData.id,
              name: productData.name,
              seller_id: productData.sellerId,
              price: productData.price,
              pictures: productData.pictures,
              quantity: 1,
            },
          ]);
        }

        setSeller((prev) => ({
          ...prev,
          [productData.id]: sellerData?.name ? sellerData?.name : "Unknown",
        }));
      });
    }

    showProducts();
  }, [fetchData, userDesc.cart]);

  useEffect(() => {
    cartProducts.map((product) => {
      if (product.quantity > 0) {
        setTotalCost(15000 + product.price * product.quantity);
      } else {
        setTotalCost(0);
      }

      return true;
    });
  }, [cartProducts]);

  if (currentUser) {
    if (userDesc?.cart?.length > 0) {
      return (
        <Stack
          spacing={4}
          sx={{
            backgroundColor: color.backgroundColor,
            color: color.onBackgroundColor,
            minHeight: "100vh",
          }}
        >
          <MarketplaceHeader
            currentUser={currentUser}
            showSearchIcon={false}
            userDesc={userDesc}
            showCategoriesList={false}
            showCartIcon={false}
          />
          <Stack spacing={4} className="cart-product-container">
            {cartProducts.map((product, index) => {
              if (product?.quantity > 0) {
                return (
                  <Stack
                    className="cart-product-card"
                    key={product.id + index}
                    direction="row"
                  >
                    <Badge
                      badgeContent={product?.quantity}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: color.primary,
                          color: color.onPrimary,
                          width: 35,
                          height: 35,
                          borderRadius: "50%",
                          fontSize: "1em",
                        },
                      }}
                    >
                      <LazyLoadImage
                        src={
                          product?.pictures
                            ? product.pictures[0]
                            : "/broken-image.jpg"
                        }
                        alt="product"
                        width={128}
                        height={128}
                        style={{
                          border: `1px solid ${color.outlineColor}`,
                          borderRadius: "1rem",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                      />
                    </Badge>

                    <Stack spacing={1}>
                      <b style={{ fontSize: "2rem" }}>{product.name}</b>
                      <p>{seller[product.id]}</p>
                    </Stack>

                    <Stack spacing={1}>
                      <p>{rupiah(product.price)}</p>
                      <b>Total: {rupiah(product.price * product.quantity)}</b>
                    </Stack>

                    <Stack spacing={1} direction="row">
                      <IconButton
                        onClick={() =>
                          changeProductQuantity(index, "decrement")
                        }
                        sx={{
                          backgroundColor: color.tertiary,
                          color: color.onTertiary,
                          borderRadius: "1rem",
                          "&:hover": {
                            backgroundColor: color.tertiaryHover,
                            color: color.onTertiaryHover,
                          },
                        }}
                      >
                        <AiOutlineMinus />
                      </IconButton>

                      <IconButton
                        disableRipple
                        onClick={() =>
                          changeProductQuantity(index, "increment")
                        }
                        sx={{
                          backgroundColor: color.tertiary,
                          color: color.onTertiary,
                          borderRadius: "1rem",
                          "&:hover": {
                            backgroundColor: color.tertiaryHover,
                            color: color.onTertiaryHover,
                          },
                        }}
                      >
                        <AiOutlinePlus />
                      </IconButton>

                      <IconButton
                        disableRipple
                        onClick={() => changeProductQuantity(index, "delete")}
                        sx={{
                          backgroundColor: color.error,
                          color: color.onError,
                          borderRadius: "1rem",
                          "&:hover": {
                            backgroundColor: color.errorHover,
                            color: color.onErrorHover,
                          },
                        }}
                      >
                        <AiOutlineDelete />
                      </IconButton>
                    </Stack>
                  </Stack>
                );
              } else {
                return null;
              }
            })}
          </Stack>

          <Stack spacing={4} className="cart-total-cost">
            <Stack
              diretion="row"
              sx={{ justifyContent: "space-between", width: "100%" }}
            >
              <b>Total</b>
              <b>{rupiah(totalCost)}</b>
            </Stack>
          </Stack>
        </Stack>
      );
    }

    if (userDesc?.cart?.length <= 0) {
      return (
        <Stack spacing={4}>
          <MarketplaceHeader
            currentUser={currentUser}
            showSearchIcon={false}
            userDesc={userDesc}
          />
          <Stack alignItems="center" justifyContent="center" width="100%">
            <p>You haven't added any product yet</p>
            <b>
              Go{" "}
              <a
                href={ROUTES.MARKETPLACE}
                style={{ color: color.primary, textDecoration: "none" }}
              >
                here to explore new products
              </a>
            </b>
          </Stack>
        </Stack>
      );
    }
  }

  if (!currentUser) {
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <p>You have to be logged in to see your cart.</p>
      <p>
        Click{" "}
        <a
          href={ROUTES.LOGIN}
          style={{ color: color.primary, textDecoration: "none" }}
        >
          here to login.
        </a>
      </p>
    </Stack>;
  }
}

export default UserCart;
