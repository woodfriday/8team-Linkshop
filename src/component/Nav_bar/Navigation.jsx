import React from "react";
import "./Navigation.css";
import "../global.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="nav">
      <div className="nav-container">
        <Link to="/list">
          <img id="nav-logo" src="/images/Linkshop-logo.png" alt="링크샵 홈" />
        </Link>
      </div>
      <Link to="/linkpost">
        <button className="nav-btn">생성하기</button>
      </Link>
    </header>
  );
}

export default Header;
