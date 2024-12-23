import React, { useEffect, useState } from "react";
import "./ProductCard1.css";
import LikeButton from "../LikeButton";

function ProductCard({
  linkShopId,
  item,
  likeCount,
  isLiked: initialIsLiked,
  onLikeClick,
}) {
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    setLocalLikeCount(likeCount);
  }, [likeCount]);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLikeClick = () => {
    // 좋아요 상태 토글 및 좋아요 수 증가/감소 로직
    const newIsLiked = !isLiked;
    setIsLiked(!isLiked);
    setLocalLikeCount((prevCount) => prevCount + (newIsLiked ? 1 : -1));
    onLikeClick();
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <a href={`/link/${linkShopId}`}>
      <div className="product-container">
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
            likeCount={localLikeCount}
            isLiked={isLiked}
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
      </div>
    </a>
  );
}

export default ProductCard;
