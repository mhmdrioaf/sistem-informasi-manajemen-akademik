import React, { useState, useEffect } from "react";
import { Stack, Badge, IconButton, Checkbox } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import color from "../../../styles/_color.scss";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import "../User.scss";

function CartItem({
  product,
  updateProductQuantity,
  handleDeleteProduct,
  setSelectedProducts,
  selectedProducts,
  onProductSelect,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const productCost = product.quantity * product.price;

  useEffect(() => {
    setIsChecked(false);
  }, [product.quantity]);

  const handleCheckBoxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    onProductSelect({ id: product.id, cost: productCost }, isChecked);
  };
  const rupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="cart-product">
      <Checkbox
        checked={isChecked}
        onChange={handleCheckBoxChange}
        inputProps={{ "aria-label": "controlled" }}
      />
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
              product.pictures[0] ? product.pictures[0] : "/broken-image.jpg"
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
          <b>Total: {rupiah(product.price * product.quantity)}</b>
        </Stack>
        <Stack className="cart-product-quantity" direction="row" spacing={2}>
          <IconButton
            size="medium"
            disableRipple
            sx={{
              backgroundColor: color.tertiary,
              color: color.onTertiary,
            }}
            onClick={() => {
              if (product.quantity > 1) {
                updateProductQuantity(product.id, product.quantity - 1);
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
              updateProductQuantity(product.id, product.quantity + 1)
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
  );
}

export default CartItem;
