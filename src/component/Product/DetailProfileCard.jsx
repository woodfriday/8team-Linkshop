import React, { useState } from "react";
import LikeButton from "../LikeButton";
import "./DetailProfileCard.css";
import MenuPopup from "../popup/MenuPopup";
import PwPopup from "../popup/PwPopup";

function DetailProfileCard({ item }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showPwPopup, setShowPwPopup] = useState(false);

  if (!item || !item.shop) {
    return <div>Loading...</div>;
  }

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        console.error("URL 복사 실패:", err);
      });
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleOpenPwPopup = () => {
    setShowPwPopup(true);
  };

  const handleClosePwPopup = () => {
    setShowPwPopup(false);
  };

  return (
    <div className="item-header">
      <div className="ico-conatiner">
        <LikeButton
          itemId={item.id}
          initialIsLiked={item.isLiked}
          initialLikeCount={item.likes}
        />
        <div className="ico-container-right">
          <img
            src="/images/icons/ic_share.png"
            alt="공유"
            onClick={handleShareClick}
            style={{ cursor: "pointer" }}
          />
          <div className="menu-container">
            <img
              src="/images/icons/ic_meatball.png"
              alt="메뉴"
              onClick={handleMenuClick}
              style={{ cursor: "pointer" }}
            />
            {showMenu && (
              <MenuPopup
                onClose={handleCloseMenu}
                onEditClick={handleOpenPwPopup}
                onDeleteClick={handleOpenPwPopup}
              />
            )}
          </div>
        </div>
      </div>

      <div className="item-info">
        <img
          src={item.shop.imageUrl}
          alt={item.shop.urlName}
          className="shop-image"
        />
        <h1>{item.name}</h1>
        <p>{item.shop.urlName}</p>
      </div>

      {showPwPopup && <PwPopup onClose={handleClosePwPopup} content="" />}
    </div>
  );
}

export default DetailProfileCard;
