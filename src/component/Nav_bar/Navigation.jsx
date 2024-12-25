import React from "react";
import "./Navigation.css";
import "../global.css";
import { Link, useLocation } from "react-router-dom";

function Header({ buttonName, onClick }) {
  const location = useLocation();

  const handleLogoClick = (event) => {
    // 이미 '/list' 페이지에 있을 경우 새로 고침
    if (location.pathname === "/list") {
      event.preventDefault(); // 기본 동작인 페이지 이동을 막음
      window.location.reload(); // 페이지 새로 고침
    }
  };

  return (
    <header className="nav">
      <div className="nav-container">
        <Link to="/list" onClick={handleLogoClick}>
          <img
            id="nav-logo"
            src="/images/logo/Linkshop-logo.png"
            alt="링크샵 홈"
          />
        </Link>
      </div>
      <button className="nav-btn" onClick={onClick}>
        {buttonName}
      </button>
    </header>
  );
}

export default Header;
