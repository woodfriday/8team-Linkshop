import React, { useEffect, useState } from "react";
import "./ProductCard1.css";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 3;
  } else if (width < 1280) {
    // Tablet viewport
    return 3;
  } else {
    // Desktop viewport
    return 6;
  }
};

function ProductCard() {
  const [pageSize, setPageSize] = useState(getPageSize());
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="product-container">
      <div className="product-profile">
        <img
          src="/images/profile-red.png"
          width={60}
          height={60}
          alt="Profile"
        />
        <div className="profile-name">
          <h2>너구리 직구상점</h2>
          <p>@pumpkinraccoon</p>
        </div>
        <img
          src="/images/icons/ic_heart-null.png"
          id="heart-click"
          width={21}
          height={19}
          alt="Heart Icon"
        />
      </div>
      <div className="product-list">
        <p>대표 상품 8</p>
        <div className="product-list-img">
          <img src="/images/shoes.png" width={95} height={95} alt="Shoes" />
          <img src="/images/shoes.png" width={95} height={95} alt="Shoes" />
          <img src="/images/shoes.png" width={95} height={95} alt="Shoes" />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
