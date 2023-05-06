import { Badge, IconButton, Stack, Divider, Link } from "@mui/material";
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
import { useAuth } from "../../../contexts/FirebaseContext";
import { db } from "../../../firebase";
import color from "../../../styles/_color.scss";
import * as ROUTES from "../../../constants/routes";
import "../User.scss";

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

  const groupedProducts = cartItems.reduce((accumulator, current) => {
    const seller = current.seller;
    if (!accumulator[seller]) {
      accumulator[seller] = [];
    }
    accumulator[seller].push(current);
    return accumulator;
  }, {});

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

  return (
    <>
      <MarketplaceHeader
        currentUser={currentUser}
        userDesc={userDesc}
        showSearchIcon={false}
        showCartIcon={false}
        showCategoriesList={false}
      />
      {cartItems.length > 0 && (
        <Stack className="cart-product-container" spacing={4}>
          {Object.keys(groupedProducts).map((seller) => (
            <>
              <Stack className="cart-seller-container" spacing={2}>
                <b key={seller}>{seller}</b>
                <Stack className="cart-products" spacing={4}>
                  {groupedProducts[seller].map((product) => (
                    <div key={product.id} className="cart-product">
                      <Stack className="cart-product-image">
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
                              product.pictures[0]
                                ? product.pictures[0]
                                : "/broken-image.jpg"
                            }
                            alt={product.name}
                            width={128}
                            height={128}
                          />
                        </Badge>
                      </Stack>
                      <Stack
                        className="cart-product-details"
                        direction={{
                          xs: "column",
                          sm: "column",
                          md: "row",
                          lg: "row",
                        }}
                      >
                        <p className="cart-product-name" title={product.name}>
                          {product.name}
                        </p>
                        <Stack className="cart-product-price">
                          <p>{rupiah(product.price)}</p>
                          <b>
                            Total: {rupiah(product.price * product.quantity)}
                          </b>
                        </Stack>
                        <Stack
                          className="cart-product-quantity"
                          direction="row"
                          spacing={2}
                        >
                          <IconButton
                            size="medium"
                            disableRipple
                            sx={{
                              backgroundColor: color.tertiary,
                              color: color.onTertiary,
                            }}
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
                          >
                            <AiOutlineMinus />
                          </IconButton>
                          <IconButton
                            size="medium"
                            disableRipple
                            sx={{
                              backgroundColor: color.tertiary,
                              color: color.onTertiary,
                            }}
                            onClick={() =>
                              updateProductQuantity(
                                product.id,
                                product.quantity + 1
                              )
                            }
                          >
                            <AiOutlinePlus />
                          </IconButton>
                          <IconButton
                            size="medium"
                            disableRipple
                            sx={{
                              backgroundColor: color.error,
                              color: color.onError,
                            }}
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <AiOutlineDelete />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </div>
                  ))}
                </Stack>
              </Stack>
              <Divider />
            </>
          ))}
          <Divider />
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
      )}

      {cartItems.length <= 0 && (
        <Stack
          className="cart-product-container"
          sx={{
            width: "100%",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: color.outlineColor }}>
            You haven't added any product yet.
          </p>
          <Link
            href={ROUTES.MARKETPLACE}
            underline="none"
            sx={{ color: color.primary }}
          >
            Explore new product.
          </Link>
        </Stack>
      )}
    </>
  );
}
export default UserCart;
