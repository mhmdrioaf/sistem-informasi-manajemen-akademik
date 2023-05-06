import { Badge, IconButton, Stack } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MarketplaceHeader } from "../../../components/layouts";
import * as ROUTES from "../../../constants/routes";
import { useAuth } from "../../../contexts/FirebaseContext";
import { db } from "../../../firebase";
import color from "../../../styles/_color.scss";

function UserCart({ currentUser, userDesc }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(15000);
  const { fetchData } = useAuth();

  const rupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const updateProductQuantity = async (itemId, newQuantity) => {
    const userRef = doc(db, "users", currentUser.uid);

    const cart = (await getDoc(userRef)).data().cart;
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    await updateDoc(userRef, { cart: updatedCart });
  };

  const handleDeleteProduct = async (itemId) => {
    const userRef = doc(db, "users", currentUser.uid);

    const cart = (await getDoc(userRef)).data().cart;
    const updatedCartItems = cart.filter((item) => item.id !== itemId);
    await updateDoc(userRef, { cart: updatedCartItems });
  };

  useEffect(() => {
    const cartRef = collection(db, "users");
    const userRef = doc(cartRef, currentUser.uid);
    const unsubscribe = onSnapshot(userRef, async (doc) => {
      if (doc.exists()) {
        const { cart } = doc.data();
        const fetchNewCartItems = cart.map(async (item) => {
          const product = await fetchData("products", item.id);
          const seller = await fetchData("users", product.seller_id);

          return {
            id: item.id,
            name: product.name,
            price: product.price,
            pictures: product.pictures,
            seller: seller.name,
            quantity: item.quantity,
          };
        });

        Promise.all(fetchNewCartItems).then((response) => {
          if (JSON.stringify(response) !== JSON.stringify(cartItems)) {
            setCartItems(response);
          }
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [cartItems, currentUser.uid, fetchData]);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalCost(totalPrice + 15000);
  }, [cartItems]);

  if (currentUser) {
    if (cartItems.length > 0) {
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
            {cartItems.map((product, index) => {
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
                      onClick={() => {
                        if (product.quantity > 1) {
                          updateProductQuantity(
                            product.id,
                            product.quantity - 1
                          );
                        } else {
                          handleDeleteProduct(product.id);
                        }
                      }}
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
                        updateProductQuantity(product.id, product.quantity + 1)
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
                      onClick={() => handleDeleteProduct(product.id)}
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
