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
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

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
            src={item.shop.imageUrl}
            width={60}
            height={60}
            alt={item.shop.id}
          />
          <div className="profile-name">
            <h2>{item.name}</h2>
            <p>{item.shop.urlName}</p>
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
                key={product.id}
                src={product.imageUrl}
                width={95}
                height={95}
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
