import React from "react";
import { AiFillStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "@mui/material/Link";
import "./Product.scss";

function Product({ product, productLink }) {
  const rupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  return (
    <Link underline="none" href={productLink} className="product-container">
      <LazyLoadImage
        src={product?.pictures[0]}
        style={{
          width: "100%",
          height: "128px",
          objectFit: "cover",
          objectPosition: "center center",
          borderRadius: ".8vw",
        }}
      />
      <p className="product-title" title={product?.name}>
        {product?.name}
      </p>
      <b className="product-price">{rupiah(product?.price)}</b>
      <p className="product-description" title={product?.description}>
        {product?.description}
      </p>
      <p className="product-sold">Terjual: 50+</p>
      <div className="product-rating">
        <AiFillStar />
        <p className="product-rating-count">{"(20)"}</p>
      </div>
    </Link>
  );
}

export default Product;
