import React from "react";
import "./PwPopup.css";

function PwPopup({ onClose }) {
  return (
    <div className="pw-popup-overlay">
      <div className="pw-popup">
        <img
          id="popup-close"
          src="/images/icons/ic_close.png"
          alt="닫기"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
        <h2>비밀번호 입력</h2>
        <p>편집하기 위해 설정한 비밀번호를 입력하세요</p>
        <div className="pw-container">
          <p>비밀번호</p>
          <input
            className=""
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
        <div className="edit-button">
          <p>편집 시작하기</p>
        </div>
      </div>
    </div>
  );
}

export default PwPopup;
