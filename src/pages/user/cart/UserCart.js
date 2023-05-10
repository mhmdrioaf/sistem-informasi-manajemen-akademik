import { Stack, Divider, Link } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MarketplaceHeader } from "../../../components/layouts";
import { useAuth } from "../../../contexts/FirebaseContext";
import { db } from "../../../firebase";
import color from "../../../styles/_color.scss";
import * as ROUTES from "../../../constants/routes";
import "../User.scss";
import CartItem from "./CartItem";

function UserCart({ currentUser, userDesc }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(15000);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { fetchData } = useAuth();

  const handleProductSelect = (product, isChecked) => {
    if (isChecked) {
      const existingProductIndex = selectedProducts.findIndex(
        (current) => current.id === product.id
      );
      if (existingProductIndex >= 0) {
        const newSelectedProducts = [...selectedProducts];
        newSelectedProducts[existingProductIndex] = {
          ...newSelectedProducts[existingProductIndex],
          cost: product.cost,
        };
        setSelectedProducts(newSelectedProducts);
      } else {
        setSelectedProducts([...selectedProducts, product]);
      }
    } else {
      setSelectedProducts(
        selectedProducts.filter((current) => current.id !== product.id)
      );
    }
  };

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
    setSelectedProducts(
      selectedProducts.filter((current) => current.id !== itemId)
    );
  };

  const handleDeleteProduct = async (itemId) => {
    const userRef = doc(db, "users", currentUser.uid);

    const cart = (await getDoc(userRef)).data().cart;
    const updatedCartItems = cart.filter((item) => item.id !== itemId);
    await updateDoc(userRef, { cart: updatedCartItems });
    setSelectedProducts(
      selectedProducts.filter((current) => current.id !== itemId)
    );
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
    const totalPrice = selectedProducts.reduce(
      (total, product) => total + product.cost,
      0
    );
    setTotalCost(totalPrice + 15000);
  }, [selectedProducts]);

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
            <Stack key={seller} className="cart-seller-container" spacing={2}>
              <b>{seller}</b>
              <Stack className="cart-products" spacing={4}>
                {groupedProducts[seller].map((product) => (
                  <CartItem
                    handleDeleteProduct={handleDeleteProduct}
                    product={product}
                    updateProductQuantity={updateProductQuantity}
                    onProductSelect={handleProductSelect}
                    setSelectedProducts={setSelectedProducts}
                    selectedProducts={selectedProducts}
                    key={product.id}
                  />
                ))}
              </Stack>
            </Stack>
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
