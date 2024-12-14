import React from "react";
import "./Navigation.css";
import "../global.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="nav">
      <div className="nav-container">
        <Link to="/list">
          <img
            id="nav-logo"
            src="/images/logo/Linkshop-logo.png"
            alt="링크샵 홈"
          />
        </Link>
      </div>
      <button className="nav-btn">생성하기</button>
    </header>
  );
}

export default Header;
