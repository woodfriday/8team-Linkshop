import React, { useState } from "react";
import "./PwPopup.css";

function PwPopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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
        <h2 className="password-title">비밀번호 입력</h2>
        <p className="password-description">
          편집하기 위해 설정한 비밀번호를 입력하세요
        </p>
        <div className="pw-container">
          <p className="pw-input-text">비밀번호</p>
          <div className="pw-input-wrapper">
            <input
              className="pw-input"
              type={isVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요."
            />
            <img
              className="pw-input-img"
              src={
                isVisible
                  ? "/images/icons/visibility-on.png"
                  : "/images/icons/visibility-off.png"
              }
              alt="비밀번호 보기"
              onClick={toggleVisibility}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <button className="edit-btn">편집 시작하기</button>
      </div>
    </div>
  );
}

export default PwPopup;
