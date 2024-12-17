import React, { useEffect, useState } from "react";
import "./ProductCard1.css";

function ProductCard() {
  return (
    <div className="product-container">
      <div className="product-profile">
        <img
          src="/images/icons/profile-red.png"
          width={60}
          height={60}
          alt="Profile"
        />
        <div className="profile-name">
          <h2>너구리 직구상점</h2>
          <p>@pumpkinraccoon</p>
        </div>
        <div className="heart-click-conatiner">
          <img
            src="/images/icons/ic_heart-null.png"
            id="heart-click"
            width={21}
            height={19}
            alt="Heart Icon"
          />
          <p>1</p>
        </div>
      </div>
      <div className="product-list">
        <p id="product-list-text">대표 상품 8</p>
        <div className="product-list-img">
          <img src="/images/shoes.png" width={95} height={95} alt="Shoes" />
          <img src="/images/shoes.png" width={95} height={95} alt="Shoes" />
          <img src="/images/shoes.png" width={95} height={95} alt="Shoes" />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
