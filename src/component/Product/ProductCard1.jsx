import React, { useEffect, useState } from "react";
import "./ProductCard1.css";
import LikeButton from "../LikeButton";

function ProductCard({ linkShopId, item, likeCount, isLiked: initialIsLiked }) {
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    setLocalLikeCount(likeCount);
  }, [likeCount]);

  useEffect(() => {
    const savedIsLiked =
      localStorage.getItem(`shop.like.${item.id}`) === "true";
    if (savedIsLiked !== isLiked) {
      setIsLiked(savedIsLiked);
      setLocalLikeCount((prevCount) => prevCount + (savedIsLiked ? 1 : -1));
    }
  }, [item.id, isLiked]);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 중지
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLocalLikeCount((prevCount) => prevCount + (newIsLiked ? 1 : -1));
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <a href={`/link/${linkShopId}`} className="product-link">
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
            initialLikeCount={localLikeCount}
            initialIsLiked={isLiked}
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
