import React, { useState, useEffect } from "react";
import { getLinkShopLike, getLinkShopDetail } from "../api/api";
import "./LikeButton.css";

function LikeButton({ itemId, initialIsLiked, initialLikeCount, onLikeClick }) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // props가 변경될 때 (다른 페이지에서 돌아올 때) 상태 동기화
  // 서버에서 받은 데이터를 그대로 사용 (이미 조정된 값)
  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [itemId, initialIsLiked, initialLikeCount]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIsLiked = !isLiked;

    // 즉시 UI 업데이트 (Optimistic Update)
    setIsLiked(newIsLiked);
    const newLikeCount = likeCount + (newIsLiked ? 1 : -1);
    setLikeCount(newLikeCount);

    // localStorage에 즉시 저장 (isLiked와 likes 모두)
    localStorage.setItem(`shop.like.${itemId}`, newIsLiked);
    localStorage.setItem(`shop.likeCount.${itemId}`, newLikeCount.toString());

    // API 호출 후 서버에서 최신 데이터를 가져와서 동기화
    getLinkShopLike(itemId, newIsLiked)
      .then(() => {
        // 서버에서 최신 데이터 가져오기
        return getLinkShopDetail(itemId);
      })
      .then((response) => response.json())
      .then((data) => {
        // 서버 데이터로 상태 동기화 (서버가 항상 최신 상태)
        setIsLiked(data.isLiked);
        setLikeCount(data.likes);
        // localStorage에 서버 데이터 저장 (isLiked와 likes 모두)
        localStorage.setItem(`shop.like.${itemId}`, data.isLiked);
        localStorage.setItem(`shop.likeCount.${itemId}`, data.likes.toString());
      })
      .catch((error) => {
        console.error("좋아요 상태 동기화 실패:", error);
        // 에러 발생 시 이전 상태로 롤백
        setIsLiked(!newIsLiked);
        setLikeCount((prevCount) => prevCount + (newIsLiked ? -1 : 1));
        localStorage.setItem(`shop.like.${itemId}`, !newIsLiked);
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
