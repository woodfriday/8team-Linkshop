import React, { useState, useEffect } from "react";
import { getLinkShopLike } from "../api/api";
import "./LikeButton.css";

function LikeButton({ itemId, initialIsLiked, initialLikeCount, onLikeClick }) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    // 로컬 스토리지에서 좋아요 상태 불러오기
    const savedIsLiked = localStorage.getItem(`shop.like.${itemId}`) === "true";
    if (savedIsLiked !== isLiked) {
      setIsLiked(savedIsLiked);
      setLikeCount((prevCount) => prevCount + (savedIsLiked ? 1 : -1));
    }
  }, [itemId]);

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  const handleLikeClick = (e) => {
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation(); // 클릭 이벤트 전파 중지
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prevCount) => prevCount + (newIsLiked ? 1 : -1));

    // 로컬 스토리지에 좋아요 상태 저장
    localStorage.setItem(`shop.like.${itemId}`, newIsLiked);

    // API 호출로 좋아요 상태 업데이트
    getLinkShopLike(itemId, newIsLiked).catch(console.error);

    // 부모 컴포넌트의 클릭 이벤트 호출
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
      <p>{likeCount}</p>
    </div>
  );
}

export default LikeButton;
