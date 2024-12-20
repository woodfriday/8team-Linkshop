import React from "react";

function LikeButton({ likeCount, isLiked, onLikeClick }) {
  return (
    <div className="heart-click-container" onClick={onLikeClick}>
      <img
        src={
          isLiked
            ? "/images/icons/ic_heart-red.png"
            : "/images/icons/ic_heart-null.png"
        }
        alt="좋아요"
        width={21}
        height={19}
      />
      <p>{likeCount}</p>
    </div>
  );
}

export default LikeButton;
