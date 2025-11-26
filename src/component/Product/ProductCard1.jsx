import React from "react";
import "./ProductCard1.css";
import LikeButton from "../LikeButton";

function ProductCard({ linkShopId, item, likeCount, isLiked: initialIsLiked }) {
  const handleLikeClick = (e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 중지
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <a href={`/link/${item.id}`} className="product-link">
        <div className="product-profile">
          <img
            className="profile-img"
            src={item.shop.imageUrl}
            alt={item.shop.id}
          />
          <div className="profile-name">
            <h2 className="profile-name-shopname">{item.name}</h2>
            <p className="profile-name-userid">@{item.userId}</p>
          </div>
          <LikeButton
            itemId={item.id}
            initialLikeCount={likeCount}
            initialIsLiked={initialIsLiked}
            onLikeClick={handleLikeClick}
          />
        </div>
        <div className="product-list">
          <p id="product-list-text">대표 상품 {item.products.length}</p>
          <div className="product-list-img">
            {item.products.map((product) => (
              <img
                className="product-preview"
                key={product.id}
                src={product.imageUrl}
                alt={product.name}
              />
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
