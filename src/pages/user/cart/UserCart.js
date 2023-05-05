import { Badge, IconButton, Stack } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MarketplaceHeader } from "../../../components/layouts";
import * as ROUTES from "../../../constants/routes";
import { useAuth } from "../../../contexts/FirebaseContext";
import { db } from "../../../firebase";
import color from "../../../styles/_color.scss";

function UserCart({ currentUser, userDesc }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(15000);
  const { fetchData, updateCart } = useAuth();

  const rupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const updateProductQuantity = async (productId, options) => {
    await updateCart(currentUser.uid, productId, options);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, `cart${currentUser.uid}`),
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          const { id, quantity } = change.doc.data();
          const productData = await fetchData("products", id);
          const sellerData = await fetchData("users", productData.seller_id);
          switch (change.type) {
            case "added":
              setCartProducts((prev) => [
                ...prev,
                {
                  id: id,
                  name: productData.name,
                  price: productData.price,
                  pictures: productData.pictures,
                  seller: sellerData.name,
                  quantity: quantity,
                },
              ]);
              break;
            case "modified":
              setCartProducts((prev) =>
                prev.map((p) => (p.id === id ? { ...p, quantity } : p))
              );

              break;
            case "removed":
              setCartProducts((prev) => prev.filter((p) => p.id !== id));

              break;

            default:
              break;
          }
        });
      }
    );

    return () => unsubscribe();
  }, [currentUser.uid, fetchData]);

  useEffect(() => {
    const totalPrice = cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalCost(totalPrice + 15000);
  }, [cartProducts]);

  if (currentUser) {
    if (cartProducts.length > 0) {
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
                      <p>{product.seller}</p>
                    </Stack>

                    <Stack spacing={1}>
                      <p>{rupiah(product.price)}</p>
                      <b>Total: {rupiah(product.price * product.quantity)}</b>
                    </Stack>

                    <Stack spacing={1} direction="row">
                      <IconButton
                        onClick={() =>
                          updateProductQuantity(product.id, "decrement")
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
                          updateProductQuantity(product.id, "increment")
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
                        onClick={() =>
                          updateProductQuantity(product.id, "delete")
                        }
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
                return (
                  <Stack spacing={4}>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      sx={{ color: color.outlineColor }}
                    >
                      <p>Nothing here...</p>
                    </Stack>
                  </Stack>
                );
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
    } else {
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
}
export default UserCart;
