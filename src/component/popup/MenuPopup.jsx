import React from "react";
import "./MenuPopup.css";

function MenuPopup({ onClose, onEditClick, onDeleteClick }) {
  return (
    <div className="menu-popup">
      <ul>
        <li onClick={onEditClick}>수정하기</li>
        <li onClick={onDeleteClick}>삭제하기</li>
      </ul>
    </div>
  );
}

export default MenuPopup;
