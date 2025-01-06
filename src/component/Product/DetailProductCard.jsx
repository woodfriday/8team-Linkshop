import React from "react";
import "./DetailProductCard.css";

const DetailProductCard = ({ product }) => {
  return (
    <div className="productcard-container">
      <img
        className="productcard-img"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="productcard-text">
        <p className="productcard-name">{product.name}</p>
        <p className="productcard-price">￦ {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DetailProductCard;
