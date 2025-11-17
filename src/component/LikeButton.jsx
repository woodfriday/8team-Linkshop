import React, { useState, useEffect } from "react";
import { getLinkShopLike, getLinkShopDetail } from "../api/api";
import "./LikeButton.css";

function LikeButton({ itemId, initialIsLiked, initialLikeCount, onLikeClick }) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    const savedIsLikedValue = localStorage.getItem(`shop.like.${itemId}`);
    const savedLikeCountValue = localStorage.getItem(
      `shop.likeCount.${itemId}`
    );

    if (savedIsLikedValue !== null) {
      setIsLiked(savedIsLikedValue === "true");
    } else {
      setIsLiked(initialIsLiked);
    }

    if (savedLikeCountValue !== null) {
      setLikeCount(parseInt(savedLikeCountValue, 10));
    } else if (savedIsLikedValue !== null) {
      const savedIsLiked = savedIsLikedValue === "true";
      const adjustment =
        savedIsLiked && !initialIsLiked
          ? 1
          : !savedIsLiked && initialIsLiked
          ? -1
          : 0;
      setLikeCount(initialLikeCount + adjustment);
    } else {
      setLikeCount(initialLikeCount);
    }
  }, [itemId, initialIsLiked, initialLikeCount]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIsLiked = !isLiked;

    setIsLiked(newIsLiked);
    const newLikeCount = likeCount + (newIsLiked ? 1 : -1);
    setLikeCount(newLikeCount);

    localStorage.setItem(`shop.like.${itemId}`, newIsLiked);
    localStorage.setItem(`shop.likeCount.${itemId}`, newLikeCount.toString());

    getLinkShopLike(itemId, newIsLiked)
      .then(() => {
        return getLinkShopDetail(itemId);
      })
      .then((response) => response.json())
      .then((data) => {
        setIsLiked(data.isLiked);
        setLikeCount(data.likes);
        localStorage.setItem(`shop.like.${itemId}`, data.isLiked);
        localStorage.setItem(`shop.likeCount.${itemId}`, data.likes.toString());
      })
      .catch((error) => {
        console.error("좋아요 상태 동기화 실패:", error);
        setIsLiked(!newIsLiked);
        setLikeCount((prevCount) => prevCount + (newIsLiked ? -1 : 1));
        localStorage.setItem(`shop.like.${itemId}`, !newIsLiked);
        localStorage.setItem(
          `shop.likeCount.${itemId}`,
          (likeCount + (!newIsLiked ? 1 : -1)).toString()
        );
      });

    if (onLikeClick) {
      onLikeClick(e);
    }
  };

  return (
    <div className="heart-click-container" onClick={handleLikeClick}>
      <img
        src={
          isLiked
            ? "/images/icons/ic_heart-red.png"
            : "/images/icons/ic_heart-null.png"
        }
        alt="좋아요"
        width={21}
        height={19}
        className="heart-img"
      />
      <p className="heart-count">{likeCount}</p>
    </div>
  );
}

export default LikeButton;
