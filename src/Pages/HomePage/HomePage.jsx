import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";
import Navigation from "../../component/Nav_bar/Navigation";
import ProductCard from "../../component/Product/ProductCard1";
import { getLinkShopList } from "../../api/api";
import useDevice from "../../hooks/useDevice";

// 무한스크롤
const getPageSize = (mode) => {
  if (mode === "mobile") {
    // Mobile viewport
    return 3;
  } else if (mode === "tablet") {
    // Tablet viewport
    return 3;
  } else {
    // Desktop viewport
    return 6;
  }
};

function HomePage() {
  const { mode } = useDevice();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState(getPageSize(mode));
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    if (items.length >= 30) {
      // 최대 30개의 데이터
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: pageSize })));
    }, 1500);
  };

  useEffect(() => {
    setPageSize(getPageSize(mode));
  }, [mode]);

  useEffect(() => {
    getLinkShopList()
      .then((response) => response.json())
      .then((data) => {
        setItems(data.list);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(mode));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mode]);

  const handleLikeClick = (index) => {
    const newItems = [...items];
    const item = newItems[index];
    if (item.isLiked) {
      item.likes -= 1;
    } else {
      item.likes += 1;
    }
    item.isLiked = !item.isLiked;
    setItems(newItems);
  };

  return (
    <div>
      <Navigation
        buttonName="생성하기"
        onClick={() => {
          window.location.href = "/linkpost";
        }}
      />
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
          {items.map((item, index) => (
            <div className="product-list" key={index}>
              <ProductCard
                item={item}
                likeCount={item.likes}
                onLikeClick={() =>
                  // TODO: 좋아요 API 호출
                  handleLikeClick(index)
                }
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
=======

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
          {items.map((index) => (
            <div className="product-list" key={index}>
              <ProductCard />
            </div>
          ))}
        </InfiniteScroll>
      </div>

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
        {items.map((index) => (
          <div className="product-list" key={index}>
            <ProductCard />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default HomePage;
