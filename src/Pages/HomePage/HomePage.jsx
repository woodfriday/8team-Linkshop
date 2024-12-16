
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";
import ProductCard from "../../component/Product/ProductCard1";

// 무한스크롤
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

function HomePage() {
  const [items, setItems] = useState(Array.from({ length: 6 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 30) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 6 })));
    }, 1500);
  };
  ///////////////

  return (
    <div className="home-container">
      {/* 검색기능 */}
      <div className="input-box">
        <img id="input-img" src="/images/icons/ic_search.png" alt="검색" />
        <input
          id="search"
          type="text"
          placeholder="샵 이름으로 검색해 보세요."
        />
      </div>
      <div className="filter">
        <p>상세필터</p>
        <img
          id="arrow-img"
          src="/images/icons/ic_arrow.png"
          alt="화살표"
          width={12}
          height={12}
        />
      </div>

      {/* 상품리스트 */}
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>모든 상품을 다 보셨습니다!</b>
          </p>
        }
      >
        {items.map((_, index) => (
          <div className="product-list" key={index}>
            <ProductCard />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default HomePage;
